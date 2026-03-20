export default function TrustBadges() {
  const items = ["Tostado fresco cada semana","Desde 2016 en Santiago","Envio gratis sobre $35.000 en RM","3 cafeterias en Santiago","Granos de origen latinoamericano","100%% cafe de especialidad"];
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: "hidden", borderBottom: "1px solid rgba(12,35,48,0.13)", borderTop: "1px solid rgba(12,35,48,0.13)", background: "#EDE7DE" }}>
      <div className="animate-tick" style={{ display: "flex", whiteSpace: "nowrap" }}>
        {doubled.map((text, i) => (
          <div key={i} style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", padding: "1.1rem 2.5rem", borderRight: "1px solid rgba(12,35,48,0.13)", flexShrink: 0 }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%%", background: "#8B6914", flexShrink: 0 }} />
            <span style={{ fontSize: "0.82rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(13,32,48,0.52)", fontWeight: 400 }}>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}