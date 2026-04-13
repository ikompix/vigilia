import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "64px",
          background:
            "linear-gradient(160deg, #f8f6f1 0%, #ece8df 55%, #dbe5f0 100%)",
          color: "#10263b",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            borderRadius: "36px",
            padding: "42px",
            border: "1px solid rgba(16,38,59,0.08)",
            background: "rgba(255,255,255,0.78)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <div
              style={{
                display: "flex",
                width: "64px",
                height: "64px",
                borderRadius: "22px",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(145deg, #10263b 0%, #315b84 100%)",
                color: "#ffffff",
                fontSize: "28px",
                fontWeight: 700,
              }}
            >
              V
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: "18px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#315b84",
                }}
              >
                Veille entreprise pour PME
              </span>
              <span style={{ marginTop: "8px", fontSize: "34px", fontWeight: 700 }}>
                Vigilia
              </span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "18px", maxWidth: "860px" }}>
            <div
              style={{
                fontSize: "72px",
                lineHeight: 1,
                fontWeight: 700,
                letterSpacing: "-0.06em",
              }}
            >
              Surveillez fournisseurs, clients et concurrents avant qu&apos;il soit trop tard.
            </div>
            <div
              style={{
                fontSize: "30px",
                lineHeight: 1.45,
                color: "#4c607a",
              }}
            >
              Alertes BODACC, justice, comptes annuels et analyse IA dans une seule vue.
            </div>
          </div>

          <div style={{ display: "flex", gap: "18px" }}>
            {["BODACC", "Justice", "Comptes", "Analyse IA"].map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  padding: "12px 18px",
                  borderRadius: "999px",
                  background: "rgba(16,38,59,0.06)",
                  fontSize: "22px",
                  color: "#10263b",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
