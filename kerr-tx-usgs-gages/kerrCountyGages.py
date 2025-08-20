#!/usr/bin/env python3
# kerr_flow_app.py
# Tkinter app for USGS IV data + NWS thresholds (no third-party libs)

from __future__ import annotations
import json
import csv
import threading
import urllib.request
import urllib.parse
import datetime as dt
from zoneinfo import ZoneInfo
from tkinter import (
    Tk, StringVar, IntVar, N, S, E, W, Text, Toplevel, END, BOTH, X, Y, VERTICAL, HORIZONTAL
)
from tkinter import messagebox, filedialog
from tkinter import ttk

# ----------------- Config -----------------
CHI = ZoneInfo("America/Chicago")
USGS_IV_BASE = "https://waterservices.usgs.gov/nwis/iv/"
PARAM_FLOW = "00060"   # discharge (cfs)
PARAM_STAGE = "00065"  # gage height (ft)

# Default thresholds (placeholders; replace with official values you use)
DEFAULT_THRESHOLDS = {
    "08165300": {"action": 7.0, "minor": 9.0, "moderate": 12.0, "major": 15.0},
    "08165500": {"action": 7.0, "minor": 10.0, "moderate": 14.0, "major": 17.0},
    "08166140": {"action": 5.0, "minor": 8.0, "moderate": 11.0, "major": 14.0},
    "08166200": {"action": 6.0, "minor": 9.0, "moderate": 12.0, "major": 15.0},
}

# ----------------- USGS helpers -----------------
def fetch_usgs_iv(sites: list[str]) -> dict:
    params = {
        "format": "json",
        "sites": ",".join(sites),
        "parameterCd": f"{PARAM_FLOW},{PARAM_STAGE}",
        "siteStatus": "all",
        "period": "P1D",
    }
    url = USGS_IV_BASE + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": "tkinter-stdlib"})
    with urllib.request.urlopen(req, timeout=60) as resp:
        data = resp.read()
    return json.loads(data.decode("utf-8"))

def parse_iso(s: str) -> dt.datetime:
    if s.endswith("Z"):
        s = s[:-1] + "+00:00"
    return dt.datetime.fromisoformat(s)

def today_chicago_ymd() -> str:
    return dt.datetime.now(tz=CHI).strftime("%Y-%m-%d")

def chicago_ymd_from_utc(iso_utc: str) -> str:
    d = parse_iso(iso_utc)  # aware
    return d.astimezone(CHI).strftime("%Y-%m-%d")

def series_param(series: dict) -> str:
    return (series.get("variable", {}).get("variableCode", [{}])[0].get("value", ""))

def series_site_id(series: dict) -> str:
    return (series.get("sourceInfo", {}).get("siteCode", [{}])[0].get("value", ""))

def series_site_name(series: dict) -> str:
    return series.get("sourceInfo", {}).get("siteName", "")

def latest_value(series: dict) -> tuple[str|None, float|None]:
    vals = series.get("values", [])
    if not vals: return (None, None)
    arr = vals[0].get("value", [])
    if not arr: return (None, None)
    last = arr[-1]
    raw, ts = last.get("value"), last.get("dateTime")
    if raw in (None, "") or not ts: return (None, None)
    try:
        return (ts, float(raw))
    except ValueError:
        return (ts, None)

def stats_today(series: dict, ymd_chi: str) -> tuple[float|None, float|None, float|None]:
    vals = series.get("values", [])
    if not vals: return (None, None, None)
    arr = vals[0].get("value", [])
    s = 0.0; n = 0; vmin = float("inf"); vmax = float("-inf")
    for rec in arr:
        raw, ts = rec.get("value"), rec.get("dateTime")
        if raw in (None, "") or not ts: continue
        try:
            val = float(raw)
        except ValueError:
            continue
        if chicago_ymd_from_utc(ts) == ymd_chi:
            s += val; n += 1
            vmin = min(vmin, val); vmax = max(vmax, val)
    if n == 0: return (None, None, None)
    return (vmin, vmax, s/n)

def categorize(gh_ft: float|None, t: dict|None) -> str:
    if gh_ft is None or not t: return "—"
    if "major" in t and gh_ft >= t["major"]: return "Major"
    if "moderate" in t and gh_ft >= t["moderate"]: return "Moderate"
    if "minor" in t and gh_ft >= t["minor"]: return "Minor"
    if "action" in t and gh_ft >= t["action"]: return "Action"
    return "No Flood"

def build_tables(iv_json: dict, thresholds: dict) -> tuple[list[list], list[list]]:
    """Returns (USGS_rows, NWS_rows) with the same columns as your HTML."""
    ts_arr = (iv_json.get("value", {}) or {}).get("timeSeries", []) or []
    sites: dict[str, dict] = {}
    for s in ts_arr:
        sid = series_site_id(s)
        if not sid: continue
        e = sites.setdefault(sid, {"siteName": series_site_name(s), "flow": None, "stage": None})
        p = series_param(s)
        if p == PARAM_FLOW:  e["flow"]  = s
        if p == PARAM_STAGE: e["stage"] = s

    ymd = today_chicago_ymd()
    usgs_rows, nws_rows = [], []
    for sid in sorted(sites.keys()):
        entry = sites[sid]
        name = entry["siteName"]

        # USGS table (flow)
        if entry["flow"]:
            ts_iso, cur_cfs = latest_value(entry["flow"])
            vmin, vmax, vavg = stats_today(entry["flow"], ymd)
        else:
            ts_iso, cur_cfs = (None, None)
            vmin = vmax = vavg = None

        usgs_rows.append([
            ts_iso or "",
            sid,
            name,
            "" if cur_cfs is None else cur_cfs,
            "" if vmin    is None else vmin,
            "" if vmax    is None else vmax,
            "" if vavg    is None else vavg,
        ])

        # NWS table (stage + category)
        if entry["stage"]:
            _, gh = latest_value(entry["stage"])
        else:
            gh = None
        t = thresholds.get(sid)
        cat = categorize(gh, t)
        a  = t.get("action")   if t else ""
        mi = t.get("minor")    if t else ""
        mo = t.get("moderate") if t else ""
        mj = t.get("major")    if t else ""
        nws_rows.append([sid, name, "" if gh is None else gh, a, mi, mo, mj, cat])
    return usgs_rows, nws_rows

# ----------------- GUI -----------------
class App:
    def __init__(self, root: Tk):
        self.root = root
        root.title("Kerr County – USGS Current Flow + NWS Flood Stages")

        # state
        self.thresholds = json.loads(json.dumps(DEFAULT_THRESHOLDS))  # copy
        self.usgs_rows: list[list] = []
        self.nws_rows:  list[list] = []
        self.auto_after_id = None

        # top controls
        frm_top = ttk.Frame(root, padding=(8,8,8,0))
        frm_top.grid(row=0, column=0, sticky=W+E)
        frm_top.columnconfigure(1, weight=1)

        ttk.Label(frm_top, text="Sites (comma-separated):").grid(row=0, column=0, sticky=W, padx=(0,6))
        self.sites_var = StringVar(value="08165300,08165500,08166140,08166200")
        ttk.Entry(frm_top, textvariable=self.sites_var).grid(row=0, column=1, sticky=W+E)

        btn_fetch = ttk.Button(frm_top, text="Fetch now", command=self.fetch_now)
        btn_fetch.grid(row=0, column=2, padx=6)

        self.btn_save_usgs = ttk.Button(frm_top, text="Save USGS CSV", command=self.save_usgs_csv, state="disabled")
        self.btn_save_usgs.grid(row=0, column=3, padx=6)
        self.btn_save_nws  = ttk.Button(frm_top, text="Save NWS CSV",  command=self.save_nws_csv, state="disabled")
        self.btn_save_nws.grid(row=0, column=4, padx=6)

        self.btn_copy_usgs = ttk.Button(frm_top, text="Copy USGS table", command=self.copy_usgs, state="disabled")
        self.btn_copy_usgs.grid(row=1, column=3, pady=6, padx=6, sticky=E)
        self.btn_copy_nws  = ttk.Button(frm_top, text="Copy NWS table",  command=self.copy_nws,  state="disabled")
        self.btn_copy_nws.grid(row=1, column=4, pady=6, padx=6, sticky=E)

        ttk.Label(frm_top, text="Auto-refresh (min):").grid(row=1, column=0, sticky=W)
        self.auto_var = StringVar(value="0")
        ttk.Entry(frm_top, width=6, textvariable=self.auto_var).grid(row=1, column=1, sticky=W)
        ttk.Button(frm_top, text="Apply", command=self.apply_auto).grid(row=1, column=2, sticky=W)

        self.status_var = StringVar(value="")
        ttk.Label(frm_top, textvariable=self.status_var, foreground="#666").grid(row=2, column=0, columnspan=5, sticky=W, pady=(4,0))

        # USGS table
        ttk.Separator(root, orient=HORIZONTAL).grid(row=1, column=0, sticky=W+E, pady=8)
        lbl1 = ttk.Label(root, text="USGS – Current (cfs) + Today Min/Max/Avg", font=("Segoe UI", 10, "bold"))
        lbl1.grid(row=2, column=0, sticky=W, padx=8)

        self.usgs_tree = self._make_tree(
            root, row=3,
            columns=("site_id","site_name","timestamp_utc","current","min","max","avg"),
            headings=("Site ID","Site Name","Timestamp (UTC)","Current (cfs)","Today Min","Today Max","Today Avg"),
            col_widths=(90, 260, 180, 120, 100, 100, 100),
            right_cols=(3,4,5,6)
        )

        # explanation + thresholds editor
        ttk.Separator(root, orient=HORIZONTAL).grid(row=4, column=0, sticky=W+E, pady=8)
        frm_explain = ttk.Frame(root, padding=(8,0,8,0))
        frm_explain.grid(row=5, column=0, sticky=W+E)
        ttk.Label(frm_explain, text="NWS/NWPS Flood-Stage Context", font=("Segoe UI", 10, "bold")).grid(row=0, column=0, sticky=W)
        ttk.Button(frm_explain, text="Edit thresholds…", command=self.edit_thresholds).grid(row=0, column=1, padx=(8,0))
        ttk.Label(frm_explain, text=(
            "USGS provides observations (discharge 00060 in cfs; gage height 00065 in ft). "
            "NWS/NWPS defines flood categories using gage-height thresholds. "
            "We compute the current category using your thresholds."
        ), wraplength=900, foreground="#666").grid(row=1, column=0, columnspan=2, sticky=W, pady=(4,0))

        # NWS table
        self.nws_tree = self._make_tree(
            root, row=6,
            columns=("site_id","site_name","gage_height","action","minor","moderate","major","category"),
            headings=("Site ID","Site Name","Gage Height (ft)","Action","Minor","Moderate","Major","Category"),
            col_widths=(90, 260, 130, 80,80,90,80,110),
            right_cols=(2,)
        )

        # initial fetch
        self.fetch_now()

    # -------------- widgets --------------
    def _make_tree(self, parent, row, columns, headings, col_widths, right_cols=()):
        frm = ttk.Frame(parent, padding=(8,0,8,0))
        frm.grid(row=row, column=0, sticky=N+S+E+W)
        parent.grid_rowconfigure(row, weight=1)
        parent.grid_columnconfigure(0, weight=1)

        tree = ttk.Treeview(frm, columns=columns, show="headings", height=10)
        vsb = ttk.Scrollbar(frm, orient=VERTICAL, command=tree.yview)
        hsb = ttk.Scrollbar(frm, orient=HORIZONTAL, command=tree.xview)
        tree.configure(yscroll=vsb.set, xscroll=hsb.set)

        for c, h, w in zip(columns, headings, col_widths):
            tree.heading(c, text=h)
            tree.column(c, width=w, anchor=E if columns.index(c) in right_cols else W)

        tree.grid(row=0, column=0, sticky=N+S+E+W)
        vsb.grid(row=0, column=1, sticky=N+S)
        hsb.grid(row=1, column=0, sticky=E+W)

        frm.grid_rowconfigure(0, weight=1)
        frm.grid_columnconfigure(0, weight=1)
        return tree

    # -------------- actions --------------
    def fetch_now(self):
        sites = [s.strip() for s in self.sites_var.get().split(",") if s.strip()]
        if not sites:
            messagebox.showerror("Input error", "Please enter at least one site ID.")
            return
        self.status_var.set("Fetching…")
        t = threading.Thread(target=self._do_fetch_thread, args=(sites,), daemon=True)
        t.start()

    def _do_fetch_thread(self, sites):
        try:
            iv_json = fetch_usgs_iv(sites)
            usgs_rows, nws_rows = build_tables(iv_json, self.thresholds)
            self.root.after(0, self._apply_results, usgs_rows, nws_rows)
        except Exception as e:
            self.root.after(0, self._on_error, str(e))

    def _on_error(self, msg):
        self.status_var.set(f"Error: {msg}")
        self.btn_save_usgs.config(state="disabled")
        self.btn_save_nws.config(state="disabled")
        self.btn_copy_usgs.config(state="disabled")
        self.btn_copy_nws.config(state="disabled")
        for tree in (self.usgs_tree, self.nws_tree):
            for i in tree.get_children(): tree.delete(i)

    def _apply_results(self, usgs_rows, nws_rows):
        # update state
        self.usgs_rows = usgs_rows
        self.nws_rows = nws_rows

        # fill USGS table
        self._fill_tree(self.usgs_tree, [
            [r[1], r[2], r[0], fmt(r[3]), fmt(r[4]), fmt(r[5]), fmt(r[6])]
            for r in usgs_rows
        ])
        # fill NWS table
        self._fill_tree(self.nws_tree, [
            [r[0], r[1], fmt(r[2], 2), fmt(r[3]), fmt(r[4]), fmt(r[5]), fmt(r[6]), r[7]]
            for r in nws_rows
        ])

        # enable buttons if we have rows
        has_u = len(usgs_rows) > 0
        has_n = len(nws_rows) > 0
        self.btn_save_usgs.config(state=("normal" if has_u else "disabled"))
        self.btn_save_nws.config(state=("normal" if has_n else "disabled"))
        self.btn_copy_usgs.config(state=("normal" if has_u else "disabled"))
        self.btn_copy_nws.config(state=("normal" if has_n else "disabled"))

        ts = dt.datetime.now().isoformat(timespec="seconds")
        self.status_var.set(f"{len(usgs_rows)} sites • updated {ts}")

    def _fill_tree(self, tree: ttk.Treeview, rows: list[list]):
        tree.freeze = True  # harmless flag, just to hint we're updating
        for i in tree.get_children(): tree.delete(i)
        for r in rows: tree.insert("", END, values=r)

    def save_usgs_csv(self):
        if not self.usgs_rows: return
        default = f"usgs_current_stats_{dt.datetime.now(tz=CHI).strftime('%Y-%m-%d')}.csv"
        path = filedialog.asksaveasfilename(defaultextension=".csv", initialfile=default,
                                            filetypes=[("CSV", "*.csv"), ("All Files", "*.*")])
        if not path: return
        header = ["timestamp_iso","site_id","site_name","current_cfs","todays_min_cfs","todays_max_cfs","todays_avg_cfs"]
        write_csv(path, header, self.usgs_rows)
        self.status_var.set(f"Saved {path}")

    def save_nws_csv(self):
        if not self.nws_rows: return
        default = f"nws_stage_categories_{dt.datetime.now(tz=CHI).strftime('%Y-%m-%d')}.csv"
        path = filedialog.asksaveasfilename(defaultextension=".csv", initialfile=default,
                                            filetypes=[("CSV", "*.csv"), ("All Files", "*.*")])
        if not path: return
        header = ["site_id","site_name","gage_height_ft","action_ft","minor_ft","moderate_ft","major_ft","category"]
        write_csv(path, header, self.nws_rows)
        self.status_var.set(f"Saved {path}")

    def copy_usgs(self):
        if not self.usgs_rows: return
        header = ["Site ID","Site Name","Timestamp (UTC)","Current (cfs)","Today Min","Today Max","Today Avg"]
        rows = [[r[1], r[2], r[0], r[3], r[4], r[5], r[6]] for r in self.usgs_rows]
        self._copy_tsv(header, rows, "USGS table")

    def copy_nws(self):
        if not self.nws_rows: return
        header = ["Site ID","Site Name","Gage Height (ft)","Action","Minor","Moderate","Major","Category"]
        rows = [[r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7]] for r in self.nws_rows]
        self._copy_tsv(header, rows, "NWS table")

    def _copy_tsv(self, header, rows, label):
        tsv = "\r\n".join(
            ["\t".join(map(safestr, header))] +
            ["\t".join(map(safestr, row)) for row in rows]
        )
        self.root.clipboard_clear()
        self.root.clipboard_append(tsv)
        self.status_var.set(f"Copied {label} to clipboard.")

    def apply_auto(self):
        # cancel current
        if self.auto_after_id is not None:
            self.root.after_cancel(self.auto_after_id)
            self.auto_after_id = None
        try:
            mins = int(self.auto_var.get() or "0")
        except ValueError:
            messagebox.showerror("Input error", "Auto-refresh must be an integer number of minutes.")
            return
        if mins > 0:
            self.status_var.set(f"Auto-refresh every {mins} min.")
            self._schedule_auto(mins)
        else:
            self.status_var.set("Auto-refresh off.")

    def _schedule_auto(self, mins: int):
        def tick():
            self.fetch_now()
            self._schedule_auto(mins)
        self.auto_after_id = self.root.after(max(1, mins) * 60 * 1000, tick)

    def edit_thresholds(self):
        top = Toplevel(self.root)
        top.title("Edit NWS thresholds (JSON)")
        top.geometry("640x400")
        txt = Text(top, wrap="word")
        txt.pack(fill=BOTH, expand=True)
        txt.insert("1.0", json.dumps(self.thresholds, indent=2))

        def save():
            try:
                val = json.loads(txt.get("1.0", END))
                if not isinstance(val, dict):
                    raise ValueError("Top-level JSON must be an object")
                self.thresholds = val
                top.destroy()
                self.status_var.set("Thresholds updated.")
                # re-evaluate categories on current data (no refetch needed)
                if self.usgs_rows or self.nws_rows:
                    # Rebuild only the NWS table: we need stage heights. Reuse latest fetched JSON? Not stored.
                    # Simpler: trigger fetch to recompute with new thresholds.
                    self.fetch_now()
            except Exception as e:
                messagebox.showerror("Invalid JSON", str(e))

        btnfrm = ttk.Frame(top)
        btnfrm.pack(fill=X)
        ttk.Button(btnfrm, text="Save", command=save).pack(side="right", padx=6, pady=6)
        ttk.Button(btnfrm, text="Cancel", command=top.destroy).pack(side="right", padx=6, pady=6)

# ----------------- small utils -----------------
def fmt(v, digits=3):
    if v == "" or v is None: return ""
    try:
        return f"{float(v):.{digits}f}" if isinstance(v, float) else str(v)
    except Exception:
        return str(v)

def safestr(x):
    return "" if x is None else str(x)

def write_csv(path, header, rows):
    with open(path, "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(header)
        for r in rows:
            w.writerow(r)

# ----------------- main -----------------
if __name__ == "__main__":
    root = Tk()
    # nicer default ttk theme selection
    try:
        s = ttk.Style()
        if "vista" in s.theme_names():
            s.theme_use("vista")
        elif "clam" in s.theme_names():
            s.theme_use("clam")
    except Exception:
        pass
    App(root)
    root.mainloop()
