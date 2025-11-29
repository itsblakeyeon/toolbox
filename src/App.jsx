import { useState } from "react";
import BuilderTab from "./components/BuilderTab";
import SavedTab from "./components/SavedTab";
import UTMGuide from "./components/UTMGuide";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  const [activeTab, setActiveTab] = useState("builder");
  const [savedItems, setSavedItems] = useLocalStorage("utmSavedItems", []);

  // 저장 항목 추가
  const handleSave = (newItems) => {
    setSavedItems([...savedItems, ...newItems]);
  };

  // 개별 삭제
  const handleDelete = (id) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      setSavedItems(savedItems.filter((item) => item.id !== id));
    }
  };

  // 전체 삭제
  const handleDeleteAll = () => {
    if (confirm("모든 저장된 URL을 삭제하시겠습니까?")) {
      setSavedItems([]);
    }
  };

  // 코멘트 업데이트
  const handleUpdateComment = (id, comment) => {
    setSavedItems(
      savedItems.map((item) => (item.id === id ? { ...item, comment } : item))
    );
  };

  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">UTM Builder</h1>
          <p className="text-gray-400">UTM builder for marketers</p>
        </div>

        {/* 탭 전환 UI */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-lg bg-[#16213e] p-1">
            <button
              onClick={() => setActiveTab("builder")}
              className={`px-6 py-2 rounded-md font-medium transition duration-200 ${
                activeTab === "builder"
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Builder
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`px-6 py-2 rounded-md font-medium transition duration-200 ${
                activeTab === "saved"
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Saved ({savedItems.length})
            </button>
          </div>
        </div>

        {/* 탭 콘텐츠 */}
        {activeTab === "builder" ? (
          <BuilderTab onSave={handleSave} />
        ) : (
          <SavedTab
            savedItems={savedItems}
            onDelete={handleDelete}
            onDeleteAll={handleDeleteAll}
            onUpdateComment={handleUpdateComment}
          />
        )}

        <UTMGuide />
      </div>
    </div>
  );
}

export default App;
