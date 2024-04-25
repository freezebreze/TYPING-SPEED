import './App.css'
import RestButton from './components/RestButton';
import { ReactNode} from 'react';
import Results from './components/Results';
import UserTypings from './components/UserTypings';

import useEngine from './hooks/useEngine';
import ToggleDark from './components/ToggleDark';
import { calculateAccuracy } from './utils/helps';
import mp3 from './assets/mp3/spacebar-click-keyboard-199448.mp3'
function App() {
  const {words, resetTyping, state, timeLeft, typed, totalTyped,errors,  typingAudio }= useEngine()
  return (
    <>
    <ToggleDark></ToggleDark>
    <CountdownTimer timeLeft={timeLeft} />
    <WordsContainer>
    <GenerateWords words= {words}/>
    <UserTypings className='absolute top-0 left-0' words = {words} userInput={typed} />
    </WordsContainer>
    <RestButton className='mx-auto mt-8 text-slate-500' onRest={resetTyping}></RestButton>
    <Results state = {state} error={errors} accuracyPercentage={calculateAccuracy(totalTyped, errors)} total={totalTyped} className='mt-10 '></Results>
    <audio ref={typingAudio} src={mp3}></audio>
    </>
  )
}

const WordsContainer = ({children} : {children:ReactNode}) => {
  return <div className='relative max-w-xl text-3xl leading-relaxed text-left break-all'>
    {children}
  </div>
}
const GenerateWords  = ({words} : {words : string}) => {
  return <div className='text-black dark:text-slate-500'>{words}</div>
}

const CountdownTimer = ({timeLeft} : {timeLeft : number}) => {
  return <h2 className='mb-3 font-medium text-green-500 dark:text-primary-400'>Time: {timeLeft}</h2>
}
export default App
