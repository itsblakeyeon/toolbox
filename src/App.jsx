import BuilderTab from "./components/BuilderTab";

function App() {
  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">UTM Builder</h1>
          <p className="text-gray-400">UTM builder for marketers</p>
        </div>

        <BuilderTab />
      </div>
    </div>
  );
}

export default App;
