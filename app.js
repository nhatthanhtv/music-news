const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'Thanh Playing'

const btnStart = $(".btn-start");
const player = $(".player");
const line = $(".line");
const btnLogin = $(".btn-login");
const formLogin = $(".form-login");
const backFormLogin = $(".icon-back");
const playlist = $(".playlist");
const dashboard = $(".dashboard");
const cdthumb = $(".cd-thumb");
const title = $(".title");
const author = $(".author");
const audio = $("audio");
const btnPlay = $(".btn-play-toger");
const btnNext = $(".btn-next");
const btnPrev = $(".btn-prev"); 
const progress = $(".progress"); 
const btnRandom = $(".btn-random"); 
const btnRepeat = $(".btn-repeat"); 

const app = {
    currentIndex: 0,
    isSongPlay: false,
    isRandom: false,
    isRepeat: false,
   
    songs: [
        {
            name: "Light It Up",
            singer: "Robin Hustin x TobiMorrow",
            path: "https://aredir.nixcdn.com/NhacCuaTui968/LightItUp-RobinHustinTobimorrowJex-5619031.mp3?st=kzpVQ5kKnf2LlcAqM6lnxg&e=1623143881",
            image: "https://avatar-ex-swe.nixcdn.com/song/2019/01/08/1/3/d/a/1546913843457_640.jpg",
        },
        {
            name: "Yoru ni kakeru",
            singer: "YOASOBI",
            path: "https://aredir.nixcdn.com/NhacCuaTui992/YoruNiKakeru-YOASOBI-6149490.mp3?st=68hnFhtGF6RukKDcDcW9Mw&e=1623132179",
            image: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/16788ee5-3436-474a-84fd-6616063a1a9a/de2f4eq-bc67fa17-8dae-46a9-b85d-fe8082c34841.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzE2Nzg4ZWU1LTM0MzYtNDc0YS04NGZkLTY2MTYwNjNhMWE5YVwvZGUyZjRlcS1iYzY3ZmExNy04ZGFlLTQ2YTktYjg1ZC1mZTgwODJjMzQ4NDEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.dABuqANeQEs6FBfslZHdG1lW_gDwzf61yqiSABROSx0",
        },
        {
            name: "Muộn rồi mà sao còn",
            singer: "Sơn Tùng M-TP",
            path: "https://aredir.nixcdn.com/Believe_Audio19/MuonRoiMaSaoCon-SonTungMTP-7011803.mp3?st=w9AA-eyRI7yD_VYGfvVWeQ&e=1623141624",
            image: "https://pbs.twimg.com/media/Ez5jRyVVgAQN6Kh.jpg",
        },
        {
            name: "See You Again",
            singer: "Charlie Puth ft Wiz Khalifa",
            path: "https://aredir.nixcdn.com/NhacCuaTui894/SeeYouAgain-KurtSchneiderEppicAlexGoot-3888930.mp3?st=1q73myBS8FKr8Rx0snpMJw&e=1623144094",
            image: "https://nghiennhac.com/wp-content/uploads/2020/09/see-you-again-0.jpg",
        },

        {
            name: "Symphony",
            singer: "Clean Bandit",
            path: "https://aredir.nixcdn.com/Sony_Audio37/Symphony-CleanBanditZaraLarsson-4822950.mp3?st=sPgJSXtRXYpT_rznXyez6g&e=1623144426",
            image: "https://i.ytimg.com/vi/PIf9GvWaxQQ/maxresdefault.jpg",
        },
        {
            name: "Waiting For Love",
            singer: "Avicii",
            path: "https://aredir.nixcdn.com/Unv_Audio45/WaitingForLove-Avicii-4203283.mp3?st=mXGv6kIqbxg_coAyUqzlnw&e=1623144462",
            image: "https://i.ytimg.com/vi/Hmbm3G-Q444/maxresdefault.jpg",
        },
        {
            name: "Alone",
            singer: "Marshmello",
            path: "https://aredir.nixcdn.com/NhacCuaTui927/Alone-Marshmello-4456939.mp3?st=RTsMC9tNcKEi8fd0iKtdaA&e=1623144502",
            image: "https://i.ytimg.com/vi/UNB8F0ObA4g/maxresdefault.jpg",
        },
        {
            name: "Something Just Like This",
            singer: "The Chainsmokers & Coldplay",
            path: "https://aredir.nixcdn.com/Sony_Audio39/SomethingJustLikeThis-TheChainsmokersColdplay-5337136.mp3?st=VQuH6VgNsPlBizbk-c7n3w&e=1623144556",
            image: "https://avatar-ex-swe.nixcdn.com/song/2017/11/07/a/1/4/5/1510038809679_640.jpg",
        },
        {
            name: "Sugar",
            singer: "Maroon 5",
            path: "https://aredir.nixcdn.com/Unv_Audio73/Sugar-Maroon5-3338455.mp3?st=3FUWEyikJePPeAuREUcw9g&e=1623144644",
            image: "https://i.ytimg.com/vi/7vw84EkHOlY/maxresdefault.jpg",
        },
    ],

    defineProperties: function () {
        Object.defineProperty(this, "currentSong", {
            get: function () {
                return this.songs[this.currentIndex];
            },
        });
    },

    renderSongs: function () {
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song ${index === this.currentIndex ? 'active': ''} " data-index="${index}">
            <div class="song-img" style="background-image: url(${song.image});"></div>
            <div class="song-content">
                <h3 class="song-content-heading">
                    ${song.name}
                </h3>
                <p class="song-content-author">
                    ${song.singer}
                </p>
            </div>
            <div class="song-option">
                <i class="fas fa-ellipsis-h"></i>
            </div>
        </div>

            `;
        });
        playlist.innerHTML = htmls.join("");
    },
    loadCurrentSong: function () {
        cdthumb.style = `background-image: url(${this.currentSong.image});`;
        title.textContent = this.currentSong.name;
        author.textContent = this.currentSong.singer;
        audio.src = this.currentSong.path;

    },


    handleEvent: function () {
        const _this = this;

        const cdThumbAnimate = cdthumb.animate(
            [
                {
                    transform: "rotate(360deg)",
                },
            ],
            {
                duration: 10000,
                iterations: Infinity,
            }
        );
        cdThumbAnimate.pause();

        // xử lí bấm start hiện player
        btnStart.onclick = function () {
            player.classList.add("show");
        };
        // bấm tắt player
        line.onclick = function () {
            player.classList.remove("show");
        };
        // click login home
        btnLogin.onclick = function () {
            formLogin.classList.add("active");
        };
        // back form login login
        backFormLogin.onclick = function () {
            formLogin.classList.remove("active");
        };
        // bấm play
        btnPlay.onclick = function () {
            if (_this.isSongPlay) {
                audio.pause();
            } else {
                audio.play();
            }
        };
        audio.onplay = function () {
            cdThumbAnimate.play();
            _this.isSongPlay = true;
            player.classList.add("active");
        };
        audio.onpause = function () {
            cdThumbAnimate.pause();
            _this.isSongPlay = false;
            player.classList.remove("active");
        };
        btnNext.onclick = function () {
            if(_this.isRandom){
                _this.playRandomSong()
            }else{
                
                _this.nextSong()
            }
            _this.loadCurrentSong()
            audio.play()
            _this.renderSongs()
            _this.scrollToActiveSong()

        }
        btnPrev.onclick = function () {
            if(_this.isRandom){
                _this.playRandomSong()
            }else{
                
                _this.prevSong()
            }
            _this.loadCurrentSong()
            audio.play()
            _this.renderSongs()
            _this.scrollToActiveSong()

        }
        audio.ontimeupdate = function () {
            const degSong = audio.currentTime / audio.duration *100
            if(audio.currentTime){
                progress.value = degSong
            }
          };

          progress.oninput = function(e){
            const seekTime = (audio.duration / 100) * e.target.value;
            audio.currentTime = seekTime;
          }
        
          btnRandom.onclick = function () {
              _this.isRandom = !_this.isRandom;
              btnRandom.classList.toggle('active',_this.isRandom)
          }
          //   xử lí phát lai 1 bài hát
          btnRepeat.onclick = function () {
              _this.isRepeat = !_this.isRepeat;
              btnRepeat.classList.toggle('active',_this.isRepeat)
              
            } 
            
            audio.onended =  function () {
                if(_this.isRepeat){
                    audio.play()
                }else{
                    btnNext.click()
                }
                
            }
            playlist.onclick =  function (e) {
                // xử lí khi click bài đo
                const songNode = e.target.closest('.song:not(.active)')
                if(songNode || e.target.closest('.song-option')){
                    // xử lí click vào song
                    if(songNode){
                        _this.currentIndex = Number(songNode.dataset.index)
                        _this.loadCurrentSong()
                        _this.renderSongs()
                        audio.play()
                    }
                    // xử lí click vào option
                    if(e.target.closest('.song-option')){

                    }
                }
            }
    },

    nextSong: function () {
        this.currentIndex++
        if(this.currentIndex == this.songs.length){
            this.currentIndex = 0;
            
        }
    },

    prevSong: function () {
        this.currentIndex--
        if(this.currentIndex < 0){
            this.currentIndex = this.songs.length -1
            console.log(this.currentIndex)
        }
    },
    // đang suy ngẫm
    playRandomSong: function () {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        }while(newIndex == this.currentIndex){
            this.currentIndex = newIndex;
            this.loadCurrentSong()
        }
    },
    scrollToActiveSong:function () {
        setTimeout(function () {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'center',
              });
        },500)
    },


    start: function () {
        this.handleEvent();
        this.renderSongs();
        this.defineProperties();
        this.loadCurrentSong();
    },
};
app.start();
