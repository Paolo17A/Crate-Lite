"use client";

import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import type { EndpointRow, PingStatus } from "@/hooks/useEndpointIndex";

type Props = {
  rows: EndpointRow[];
};

const statusLabel: Record<PingStatus, string> = {
  checking: "Checking",
  up: "Up",
  down: "Down",
  skipped: "Skipped",
};

const statusColor: Record<
  PingStatus,
  "default" | "success" | "error" | "warning"
> = {
  checking: "default",
  up: "success",
  down: "error",
  skipped: "warning",
};

function formatCheckedAt(timestamp: number) {
  return new Intl.DateTimeFormat("en-PH", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  }).format(timestamp);
}

export default function EndpointTable({ rows }: Props) {
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{ border: "1px solid", borderColor: "divider" }}
    >
      <Table size="small" aria-label="Active system endpoints">
        <TableHead>
          <TableRow>
            <TableCell>Method</TableCell>
            <TableCell>Path</TableCell>
            <TableCell>Ping</TableCell>
            <TableCell align="right">Latency</TableCell>
            <TableCell>Last checked</TableCell>
            <TableCell>Detail</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6}>Waiting for first status poll…</TableCell>
            </TableRow>
          ) : (
            rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.method ?? "—"}</TableCell>
                <TableCell>{row.path}</TableCell>
                <TableCell>
                  <Chip
                    size="small"
                    label={statusLabel[row.pingStatus]}
                    color={statusColor[row.pingStatus]}
                    variant={row.pingStatus === "up" ? "filled" : "outlined"}
                  />
                </TableCell>
                <TableCell align="right">
                  {row.latencyMs == null ? "—" : `${row.latencyMs} ms`}
                </TableCell>
                <TableCell>
                  {row.lastCheckedAt ? formatCheckedAt(row.lastCheckedAt) : "—"}
                </TableCell>
                <TableCell>{row.detail ?? "—"}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
