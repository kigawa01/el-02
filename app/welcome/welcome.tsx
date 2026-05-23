import bg from "../data/1-back.png"

export function Welcome() {
  return (
    <main className="flex flex-col  items-center justify-center bg-[url(data/1-back.png)] h-150 w-full" >
          <h1 className="text-2xl mb-3">title</h1>
          <a href="/game/1">
          <button className="bg-amber-400 rounded-2xl px-3 py-5">
            <p className="font-bold text-amber-900">夏休み開始</p>
            
          </button>
              </a>
    </main>
  );
}


