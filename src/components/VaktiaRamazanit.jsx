import { useState, useEffect } from "react";

export default function VaktiaRamazanit() {
  const vaktiaData = [
    { data: "1 Mars", dita: "E shtunë", imsaku: "4:34", iftari: "17:33" },
    { data: "2 Mars", dita: "E diel", imsaku: "4:33", iftari: "17:34" },
    { data: "3 Mars", dita: "E hënë", imsaku: "4:31", iftari: "17:36" },
    { data: "4 Mars", dita: "E martë", imsaku: "4:29", iftari: "17:37" },
    { data: "5 Mars", dita: "E mërkurë", imsaku: "4:27", iftari: "17:38" },
    { data: "6 Mars", dita: "E enjte", imsaku: "4:25", iftari: "17:39" },
    { data: "7 Mars", dita: "E premte", imsaku: "4:23", iftari: "17:40" },
    { data: "8 Mars", dita: "E shtunë", imsaku: "4:21", iftari: "17:42" },
    { data: "9 Mars", dita: "E diel", imsaku: "4:20", iftari: "17:43" },
    { data: "10 Mars", dita: "E hënë", imsaku: "4:18", iftari: "17:44" },
    { data: "11 Mars", dita: "E martë", imsaku: "4:16", iftari: "17:45" },
    { data: "12 Mars", dita: "E mërkurë", imsaku: "4:15", iftari: "17:47" },
    { data: "13 Mars", dita: "E enjte", imsaku: "4:14", iftari: "17:48" },
    { data: "14 Mars", dita: "E premte", imsaku: "4:13", iftari: "17:49" },
    { data: "15 Mars", dita: "E shtunë", imsaku: "4:11", iftari: "17:50" },
    { data: "16 Mars", dita: "E diel", imsaku: "4:09", iftari: "17:51" },
    { data: "17 Mars", dita: "E hënë", imsaku: "4:08", iftari: "17:52" },
    { data: "18 Mars", dita: "E martë", imsaku: "4:06", iftari: "17:53" },
    { data: "19 Mars", dita: "E mërkurë", imsaku: "4:04", iftari: "17:55" },
    { data: "20 Mars", dita: "E enjte", imsaku: "4:02", iftari: "17:56" },
    { data: "21 Mars", dita: "E premte", imsaku: "4:00", iftari: "17:57" },
    { data: "22 Mars", dita: "E shtunë", imsaku: "3:57", iftari: "17:58" },
    { data: "23 Mars", dita: "E diel", imsaku: "3:55", iftari: "17:59" },
    { data: "24 Mars", dita: "E hënë", imsaku: "3:53", iftari: "18:00" },
    { data: "25 Mars", dita: "E martë", imsaku: "3:51", iftari: "18:02" },
    { data: "26 Mars", dita: "E mërkurë", imsaku: "3:49", iftari: "18:03" },
    { data: "27 Mars", dita: "E enjte", imsaku: "3:46", iftari: "18:04" },
    { data: "28 Mars", dita: "E premte", imsaku: "3:44", iftari: "18:05" },
    { data: "29 Mars", dita: "E shtunë", imsaku: "3:41", iftari: "18:06" },
  ];

  const [currentDate, setCurrentDate] = useState("29 Mars");
  const [countdownIftar, setCountdownIftar] = useState("");
  const [countdownSyfyri, setCountdownSyfyri] = useState("");
  const [currentVaktia, setCurrentVaktia] = useState(null);
  const [nextVaktia, setNextVaktia] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formattedTime = formatTime(now);

      const todayVaktia = vaktiaData.find(v => v.data === currentDate);
      setCurrentVaktia(todayVaktia);

      const nextVaktiaIndex = vaktiaData.findIndex(v => v.data === currentDate) + 1;
      setNextVaktia(vaktiaData[nextVaktiaIndex]);

      if (todayVaktia) {
        const iftarCountdown = calculateCountdown(todayVaktia.iftari, now);
        setCountdownIftar(iftarCountdown);

        const syfyriCountdown = calculateCountdown(todayVaktia.imsaku, now);
        setCountdownSyfyri(syfyriCountdown);

        if (syfyriCountdown === "Koha ka kaluar!" && nextVaktia) {
          const nextSyfyriCountdown = calculateCountdown(nextVaktia.imsaku, now, true);
          setCountdownSyfyri(`Syfyri i nesër: ${nextSyfyriCountdown}`);
        }

        if (iftarCountdown === "Koha ka kaluar!" && nextVaktia) {
          const nextIftarCountdown = calculateCountdown(nextVaktia.iftari, now, true);
          setCountdownIftar(`Iftari i nesër: ${nextIftarCountdown}`);
        }
      } else {
        setCountdownIftar("Nuk ka vakt për sot.");
        setCountdownSyfyri("Nuk ka vakt për sot.");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentDate]);

  function formatTime(date) {
    return date.toLocaleTimeString("sq-AL", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  }

  function calculateCountdown(targetTime, now, isNextDay = false) {
    const [hours, minutes] = targetTime.split(":").map(Number);
    const targetDate = new Date(now);

    if (isNextDay) targetDate.setDate(now.getDate() + 1);

    targetDate.setHours(hours, minutes, 0, 0);

    if (targetDate < now) {
      return "Koha ka kaluar!";
    }

    const timeDiff = targetDate - now;
    return formatCountdown(timeDiff);
  }

  function formatCountdown(ms) {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${hours} orë, ${minutes} minuta, ${seconds} sekonda`;
  }

  function isStrikethroughDate(date) {
    const strikethroughDates = ["1 Mars", "2 Mars", "3 Mars", "4 Mars", "5 Mars", "6 Mars", "7 Mars", "8 Mars", "9 Mars", "10 Mars", "11 Mars", "12 Mars", "13 Mars", "14 Mars",
      "15 Mars",  "16 Mars", "17 Mars", "18 Mars", "19 Mars", "20 Mars", "21 Mars", "22 Mars", "23 Mars", "24 Mars", "25 Mars", "26 Mars", "27 Mars", "28 Mars"
     ];
    return strikethroughDates.includes(date);
  }

  return (
    <div className="font-sans h-full bg-gray-100 p-4 sm:p-6 lg:p-8 flex flex-col">
      <header className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800">Vaktia e Ramazanit 2025 (Kosovë)</h1>
      </header>

      <div className="text-center text-gray-600 mb-4">
        <p className="text-xs sm:text-sm">Numërimi për ditën e ardhshme fillon nga mesnata.</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:space-x-6 mb-8 justify-center items-center">
        <div className="bg-slate-400 p-4 sm:p-6 rounded-lg shadow-lg text-center w-full sm:w-1/2 mb-6 sm:mb-0 flex-grow h-full">
          <h2 className="text-lg sm:text-xl font-semibold text-white">Syfyr - {currentDate}</h2>
          <p className="text-sm sm:text-lg text-white">{countdownSyfyri}</p>
        </div>

        <div className="bg-slate-500 p-4 sm:p-6 rounded-lg shadow-lg text-center w-full sm:w-1/2 mb-6 sm:mb-0 flex-grow h-full">
          <h2 className="text-lg sm:text-xl font-semibold text-white">Iftar - {currentDate}</h2>
          <p className="text-sm sm:text-lg text-white">{countdownIftar}</p>
        </div>
      </div>

      <div className="overflow-x-auto mb-8 flex-grow w-full">
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-4 text-left">Data</th>
              <th className="p-4 text-left">Dita</th>
              <th className="p-4 text-left">Imsaku</th>
              <th className="p-4 text-left">Iftari</th>
            </tr>
          </thead>
          <tbody>
            {vaktiaData.map((vaktia, index) => (
              <tr key={index} className={`border-t border-gray-300 ${isStrikethroughDate(vaktia.data) ? 'line-through text-gray-400' : ''}`}>
                <td className="p-4">{vaktia.data}</td>
                <td className="p-4">{vaktia.dita}</td>
                <td className="p-4">{vaktia.imsaku}</td>
                <td className="p-4">{vaktia.iftari}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer className="bg-gray-800 text-white w-full py-4 mt-8">
        <p className="text-center text-sm sm:text-lg">© 2025 A GM Creation.</p>
      </footer>
    </div>
  );
}
