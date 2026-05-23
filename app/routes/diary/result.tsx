import { useNavigate, useSearchParams } from "react-router";
import type { Route } from "./+types/result";
import { getDiary } from "../../data/diaries";
import { games } from "../../data/games";
import { buildClearedParams, getClearedIds } from "../../utils/cleared";

export const handle = {
  title: (params: Record<string, string | undefined>) =>
    getDiary(parseInt(params.diaryId ?? "1"))?.title ?? null,
};

export function meta({ params }: Route.MetaArgs) {
  return [{ title: `Diary ${params.diaryId} - Result ${params.resultId}` }];
}

export default function DiaryResult({ params }: Route.ComponentProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const version = searchParams.get("version") ?? "1.0";
  const outcome = searchParams.get("outcome") ?? "fail";
  const clearedIds = getClearedIds(searchParams);
  const diary = getDiary(parseInt(params.diaryId));

  const newClearedIds = outcome === "clear"
    ? [...new Set([...clearedIds, parseInt(params.diaryId)])]
    : clearedIds;
  const allCleared = games.every((g) => newClearedIds.includes(g.id));

  return (
    <div　className="w-fill opacity-80 h-screen object-cover flex justify-center" style={{ position: "relative" }}>
      <img
        src={diary?.image ?? "https://placehold.co/1280x720"}
        alt="diary"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          color: "white",
          textAlign: "center",
          textShadow: "0 2px 8px rgba(0,0,0,0.8)",
        }}
      >
        <h1 style={{ fontSize: "3rem", margin: 0 }}>
          {params.diaryId =="1" ?
            <span>7月☀日</span>
          :<span>8月△日</span>
          }
          {/* Diary {params.diaryId} */}
          </h1>
        {params.diaryId =="1"?<div>
        {params.resultId =="3" ?
        <div className="bg-[url(data/clear1.png)] h-70 w-100 bg-cover mx-5 rounded-lg border-2 border-amber-200"></div>
        :
        <div className="bg-[url(data/clear2.png)] h-70 w-100 bg-cover mx-5 rounded-lg border-2 border-amber-200"></div>
        
        }


        </div>:
        <div>
        {params.resultId =="3"?
        <div className="bg-[url(data/maturi_select.png)] h-70 w-100 bg-cover mx-5 rounded-lg border-2 border-amber-200"></div>
        :
        <div className="bg-[url(data/maturi1.png)] h-70 w-100 bg-cover mx-5 rounded-lg border-2 border-amber-200"></div>
        }


        </div>
        }
        
        <p style={{ fontSize: "1.5rem", marginTop: "1rem" }}>Result {params.resultId}

          {params.diaryId =="1"?<div>
            {params.resultId == "1"? 
              <p>セミがうるさすぎて耳から血が出てきた　<br />しばらく森には行きたくない</p>
            :params.resultId =="2"?
            <p>セミしかいないのかこの森 <br />カブトムシどこ・・・ここ・・・？</p>
            :
            <p>カブトムシ捕まえた！うれし～</p>
            }


          </div>:
          <div>
            {params.resultId == "1"? 
              <p>偶然友達と会えた！</p>
            :params.resultId =="2"?
            <p>新しい友達ができた！</p>
            :
            <p>所詮クソ田舎　すべてが虚しい</p>
            }</div>
          }


        </p>
      </div>
      <button
        onClick={() => navigate(`/game/${params.diaryId}?${buildClearedParams(clearedIds, { version })}`) }
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "2rem",
          padding: "0.75rem 1.5rem",
          fontSize: "1rem",
          background: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
        }}
      >
        もっかいやる
      </button>
      <button
        onClick={() => navigate(`/select/1?${buildClearedParams(newClearedIds, { version })}`)}
        style={{
          position: "absolute",
          bottom: "2rem",
          right: "2rem",
          padding: "0.75rem 1.5rem",
          fontSize: "1rem",
          background: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
        }}
      >
        次の日へ →
      </button>
    </div>
  );
}
