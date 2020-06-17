import smooth_jazz from '../assets/audio/WelcomeScreen/smooth_jazz.mp3'
import click_sound from '../assets/audio/Misc/click.mp3'
import battlefield_1 from '../assets/audio/EnemyGrid/battlefield_1.mp3'
import battlefield_2 from '../assets/audio/EnemyGrid/battlefield_2.mp3'
import battlefield_3 from '../assets/audio/EnemyGrid/battlefield_3.mp3'
import battlefield_4 from '../assets/audio/EnemyGrid/battlefield_4.mp3'
import battlefield_5 from '../assets/audio/EnemyGrid/battlefield_5.mp3'
import battlefield_6 from '../assets/audio/EnemyGrid/battlefield_6.mp3'
import game_paused from '../assets/audio/EnemyGrid/paused_game.mp3'
import next_level from '../assets/audio/NextLevel/next_level_congratulation.mp3'
import game_over from '../assets/audio/GameOver/game_over.mp3'
import bullet from '../assets/audio/GridMovement/bullet.mp3'
import horizontal from '../assets/audio/GridMovement/alien_horizontal_movement.mp3'
import vertical from '../assets/audio/GridMovement/alien_vertical_movement.mp3'
import bomb_launch from '../assets/audio/GridMovement/bomb_launch.mp3'
import player_explosion from '../assets/audio/GridMovement/player_explosion.mp3'
import enemy_explosion from '../assets/audio/GridMovement/enemy_explosion.mp3'

let music, pauseMusic, sound

export const AudioLibrary = (whichSound) => {

  switch (whichSound) {
    case 'click':
      sound = new Audio(click_sound)
      sound.play()
      break
    case 'bullet':
      sound = new Audio(bullet)
      sound.play()
      break
    case 'horizontal':
      sound = new Audio(horizontal)
      sound.play()
      break
    case 'vertical':
      sound = new Audio(vertical)
      sound.play()
      break
    case 'bomb_launch':
      sound = new Audio(bomb_launch)
      sound.play()
      break
    case 'player_explosion':
      sound = new Audio(player_explosion)
      sound.play()
      break
    case 'enemy_explosion':
      sound = new Audio(enemy_explosion)
      sound.play()
      break
    case 'any_sound_off':
      sound.pause()
      break
    case 'jazz_on':
      music = new Audio(smooth_jazz)
      music.setAttribute('loop', true)
      music.play()
      break
    case 'battleground':
      let track = Math.ceil(Math.random() * 6)
      switch (track) {
        case 1:
          music = new Audio(battlefield_1)
          break
        case 2:
          music = new Audio(battlefield_2)
          break
        case 3:
          music = new Audio(battlefield_3)
          break
        case 4:
          music = new Audio(battlefield_4)
          break
        case 5:
          music = new Audio(battlefield_5)
          break
        case 6:
          music = new Audio(battlefield_6)
          break
        default: break
      }
      console.log('Playing: Audio track # ' + track)
      music.setAttribute('loop', true)
      pauseMusic = new Audio(game_paused)
      pauseMusic.setAttribute('loop', true)
      music.play()
      break
    case 'pauseMusic':
      music.pause()
      pauseMusic.play()
      break
    case 'continueLevel':
      pauseMusic.pause()
      music.play()
      break
    case 'next_level':
      music = new Audio(next_level)
      music.play()
      break
    case 'game_over':
      music = new Audio(game_over)
      music.play()
      break
    case 'jazz_off':
    case 'any_music_off':
      music.pause()
      break
    default: break
  }

}
