import { CheckCircleOutlined, SyncOutlined } from "@ant-design/icons";
import { useAI } from "@llm/pc-components";
import React, { useEffect, useState } from "react";

interface CorrectionItem {
  id: string;
  original: string;
  suggestion: string;
  type: "typo" | "grammar" | "style";
}

const MOCK_DATA: CorrectionItem[] = [
  { id: "1", original: "幕要", suggestion: "不要", type: "typo" },
  { id: "2", original: "长灯", suggestion: "长亮", type: "typo" },
  { id: "3", original: "登陆", suggestion: "登录", type: "style" }
];

export const TextChecker: React.FC = () => {
  const { sendMessage } = useAI();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<CorrectionItem[]>([]);
  const [checked, setChecked] = useState(false);

  const startCheck = async () => {
    setLoading(true);
    setChecked(false);

    // Simulate AI interaction via the context provided by AIDrawer
    try {
      // In a real scenario, we might send the full text here
      const result = await sendMessage("Check text for errors");
      console.log("AI Result:", result);
      // mocking response parsing
      setItems(MOCK_DATA);
      setChecked(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Auto start check on mount if desired, or let user trigger
    startCheck();
  }, []); // eslint-disable-line

  const handleIgnore = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleReplace = (id: string) => {
    // Logic to update the actual document would go here
    console.log(`Replacing item ${id}`);
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleReplaceAll = () => {
    console.log("Replacing all items");
    setItems([]);
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          padding: 20
        }}
      >
        <SyncOutlined spin style={{ fontSize: 36, color: "#52c41a", marginBottom: 24 }} />
        <div style={{ color: "#666", fontSize: 16, marginBottom: 8 }}>正在智能纠错中...</div>
        <div style={{ color: "#999", fontSize: 12, marginBottom: 32 }}>AI正在仔细检查您的文档...</div>
        <button
          onClick={() => setLoading(false)}
          style={{
            ...btnStyle("default"),
            borderRadius: 16,
            padding: "4px 20px",
            borderColor: "#d9d9d9",
            color: "#666"
          }}
        >
          终止检测
        </button>
      </div>
    );
  }

  if (checked && items.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          padding: 20,
          textAlign: "center",
          color: "#666"
        }}
      >
        <CheckCircleOutlined style={{ fontSize: 48, color: "#52c41a", marginBottom: 16 }} />
        <div style={{ fontSize: 16, marginBottom: 20 }}>没有发现错误</div>
        <button onClick={startCheck} style={{ ...btnStyle("primary") }}>
          重新检测
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: 16, background: "#f5f5f5", height: "100%" }}>
      <div
        style={{
          background: "#fff",
          padding: 16,
          borderRadius: 8,
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <span style={{ fontSize: 16, fontWeight: 500 }}>
          <span style={{ fontSize: 20, fontWeight: "bold", marginRight: 4 }}>{items.length}</span>
          个可优化项
        </span>
        <div style={{ gap: 8, display: "flex" }}>
          <button onClick={startCheck} style={btnStyle("default")}>
            重新检测
          </button>
          <button onClick={handleReplaceAll} style={btnStyle("primary")}>
            一键替换
          </button>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              background: "#fff",
              padding: 16,
              borderRadius: 8,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
                <span style={{ color: "#999", fontSize: 12, marginRight: 8 }}>{item.original}</span>
                <span style={{ color: "#ccc", marginRight: 8 }}>→</span>
              </div>
              <div style={{ fontSize: 16, fontWeight: 500 }}>{item.suggestion}</div>
            </div>
            <div style={{ gap: 8, display: "flex" }}>
              <button onClick={() => handleIgnore(item.id)} style={btnStyle("default")}>
                忽略
              </button>
              <button onClick={() => handleReplace(item.id)} style={btnStyle("default")}>
                替换
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const btnStyle = (type: "primary" | "default"): React.CSSProperties => ({
  border: type === "primary" ? "none" : "1px solid #d9d9d9",
  background: type === "primary" ? "#00b96b" : "#fff",
  color: type === "primary" ? "#fff" : "rgba(0,0,0,0.88)",
  cursor: "pointer",
  padding: "4px 15px",
  borderRadius: 6,
  fontSize: 14,
  transition: "all 0.3s",
  height: 32
});
