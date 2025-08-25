import React from "react";

export default function SummaryBox({ summary }) {
  if (!summary) return null;
  return (
    <div className="summary-box">
      <h4>Conversation Summary:</h4>
      <p>{summary}</p>
    </div>
  );
}