import bg from "../data/1-back.png"

export function Welcome() {
  return (
    <main className=" bg-[url(data/1-back.png)] h-screen w-full flex flex-col  items-center justify-center" >
      <h1 className="text-2xl mb-3">ぼくのなつやすみver1.0</h1>
      <a href="/select/1">
      <button className="bg-amber-400 rounded-2xl px-3 py-5">
      <p className="font-bold text-amber-900">夏休み開始</p>
        </button>
      </a>

    </main>
  );
}


