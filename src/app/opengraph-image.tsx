import { ImageResponse } from "next/og";

export const alt = "Jacob White · Mechanical Engineer & Robotics Builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#09090b",
          color: "#fafafa",
          padding: "72px",
          border: "18px solid #111113",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            fontSize: "26px",
            color: "#fb923c",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "54px",
              height: "54px",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #fb923c",
              borderRadius: "8px",
              fontSize: "18px",
            }}
          >
            JW
          </div>
          MECHANICAL ENGINEERING · ROBOTICS · DIGITAL INDUSTRY
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              maxWidth: "980px",
              fontSize: "76px",
              lineHeight: 1.02,
              letterSpacing: "-3px",
              fontWeight: 700,
            }}
          >
            Building intelligent machines from first sketch to field test.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "32px",
              fontSize: "26px",
              color: "#a1a1aa",
            }}
          >
            Jacob White · UT San Antonio · Siemens · 210 Robotics
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "18px",
            color: "#52525b",
          }}
        >
          <span>CAD / CAE / AUTONOMY / MANUFACTURING</span>
          <span style={{ color: "#32d1c6" }}>GLOBAL SIEMENS IDC WINNER</span>
        </div>
      </div>
    ),
    size,
  );
}
