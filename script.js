const rarities = [
    { name: "DAMNNN", chance: 0.5, image: "images/damnnn.png", description: "สุดยอดของความโชคดี!" },
    { name: "legendary", chance: 5, image: "images/legendary.png", description: "ของหายากระดับตำนาน!" },
    { name: "epic", chance: 7.5, image: "images/epic.png", description: "สุดยอดของดีที่ไม่ได้เจอบ่อย ๆ!" },
    { name: "common", chance: 25, image: "images/common.png", description: "ของธรรมดาที่เห็นได้ทั่วไป." },
    { name: "TRASH", chance: 50, image: "images/trash.png", description: "ของที่ไม่อยากได้เลย..." },
  ];

  const historyData = [];

  function getRandomRarity() {
    const roll = Math.random() * 100;
    let cumulative = 0;
    for (const rarity of rarities) {
      cumulative += rarity.chance;
      if (roll < cumulative) return rarity;
    }
    return rarities[rarities.length - 1];
  }

  function rollGacha(times) {
    const resultDiv = document.getElementById("result");
    let content = "";
    const results = [];

    if (times === 1) {
      const rarity = getRandomRarity();
      results.push(rarity);
      content = `
        <div class="result-card-single">
          <img src="${rarity.image}" alt="${rarity.name}">
          <div class="divider"></div>
          <div class="result-content">
            <h2>${rarity.name}</h2>
            <p>${rarity.description}</p>
          </div>
        </div>
      `;
    } else {
      for (let i = 0; i < 10; i++) {
        results.push(getRandomRarity());
      }
      content = '<div class="grid-container">';
      results.forEach(r => {
        content += `
          <div class="result-card">
            <img src="${r.image}" alt="${r.name}" class="result-image">
            <h3>${r.name}</h3>
            <p style="font-size: 14px;">${r.description}</p>
          </div>
        `;
      });
      content += '</div>';
    }

    results.forEach(r => historyData.push(r.name));
    content += `<button class="button" onclick="resetGacha()">กลับไปหน้าสุ่ม</button>`;

    resultDiv.innerHTML = content;
    document.getElementById("main").style.display = "none";
    document.getElementById("history").style.display = "none";
    resultDiv.style.display = "flex";
    resultDiv.style.flexDirection = "column";
    resultDiv.style.alignItems = "center";
  }

  function resetGacha() {
    document.getElementById("main").style.display = "flex";
    document.getElementById("result").style.display = "none";
    document.getElementById("history").style.display = "none";
  }

  function showHistory() {
    const historyDiv = document.getElementById("history");
    let content = '<h2>ประวัติการสุ่ม</h2>';

    if (historyData.length === 0) {
      content += '<p>ยังไม่มีประวัติการสุ่ม</p>';
    } else {
      content += '<div class="history-container">';
      historyData.forEach((item, index) => {
        content += `<div class="history-item">${index + 1}. ${item}</div>`;
      });
      content += '</div>';
    }
    content += '<button class="button" onclick="resetGacha()">กลับไปหน้าสุ่ม</button>';

    historyDiv.innerHTML = content;
    document.getElementById("main").style.display = "none";
    document.getElementById("result").style.display = "none";
    historyDiv.style.display = "flex";
  }