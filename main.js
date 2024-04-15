document.addEventListener('DOMContentLoaded', () => {
    const src = [
      [
        "Выхода нет", "Сплин", "/assets/mp3/выхода-нет.mp3", "/assets/covers/splin.jpg"
      ],
      [
        "Город (Remake 2024)", "Кино", "/assets/mp3/Город.mp3",
        "/assets/covers/kino.jpg"
      ],
      [
        "Тоска", "Lumen", "/assets/mp3/тоска.mp3", "/assets/covers/lumen.jpg"
      ],
      [
        "Красное на чёрном", "Алиса", "/assets/mp3/кнч.mp3", "/assets/covers/alisa.jpg"
      ],
      [
        "Вояджер-1", "Noize MC", "/assets/mp3/Вояджер-1.mp3", "/assets/covers/noize.jpg"
      ],
      [
        "Осколок льда", "Ария", "/assets/mp3/Осколок-льда.mp3", "/assets/covers/ariya.jpg"
      ]
    ];
    
    for (x = 0; x < src.length; x++) {
      var s = src[x];
      var number = parseInt(x) + 1;
      var artist = document.createTextNode(number + ": " + s[0]);
      var track_name = document.createTextNode(s[1]);
      
      var listItem = document.createElement('div');
      var artist_text = document.createElement('h3');
      var track_text = document.createElement('p');
      
      artist_text.appendChild(artist);
      track_text.appendChild(track_name);
      
      listItem.appendChild(artist_text);
      listItem.appendChild(track_text);
      
      listItem.classList.add('item');
      listItem.dataset.index = x;
      
      document.getElementById('list').appendChild(listItem);
    }
    displayTrack(0);
    
    var listItems = document.querySelectorAll('.item');
    listItems.forEach(el => {
      el.onclick = () => {
        displayTrack(el.dataset.index);
      };
    });
    
    function displayTrack(x) {
      var active = document.querySelector('.is-active');
      if (active) {
        active.classList.remove('is-active'); 
      }
      var el = document.getElementById('list').children[x];
      el.classList.add('is-active');
      var s = src[x],
          artist = s[0],
          track = s[1],
          audio = s[2],
          img = s[3],
          number = parseInt(x) + 1;
      document.getElementById('title').innerText = number + ". " + artist;
      document.getElementById('song_title').innerText = track;
      var albumArt = document.getElementById('art');
      albumArt.src = img;
      albumArt.alt = artist + " " + track;
      document.getElementById('audio').src = audio;
    }
  })