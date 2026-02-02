import { useEffect, useState } from 'react'
import Layout from './components/layouts/Layout'
import Hero from './components/Hero'
import Clocks from './components/Clocks'
import Calendar from './components/Calendar'
import Summary from './components/Summary'
import Form from './components/Form'
import { calculateTimeLeft, getLifePercentageLived } from './utils'
import Portal from './components/Portal'

function App() {
  const [count, setCount] = useState(0)

  const [name, setName] = useState('Dan')
  const [birthDate, setBirthDate] = useState('1991-08-01')
  const [lifeExpectancy, setLifeExpectancy] = useState(80)
  const [showModal, setShowModal] = useState(false)
  const [data, setData] = useState(calculateTimeLeft(birthDate, lifeExpectancy))
  
  function handleToggleModal() {
    setShowModal(curr => !curr)
  }

  function resetData() {
    setName('Dan')
    setBirthDate('1991-08-01')
    setLifeExpectancy(80)
    localStorage.clear()
  }

  function handleUpdateData(n, b, e) {
    if (!n || !b || !e) { return }

    //save data to local storage so i can read it in later
    localStorage.setItem('formData',  JSON.stringify({name: n, birthDate: b, lifeExpectancy: e}))

    setName(n)
    setBirthDate(b)
    setLifeExpectancy(parseInt(e))
    handleToggleModal()
  }

  
  
  const percentage = getLifePercentageLived(birthDate, lifeExpectancy)

  useEffect(() => {
    if (!localStorage) { return }
    if (localStorage.getItem('formData')) {
      const {name: n, birthDate: b, lifeExpectancy: e} = JSON.parse(localStorage.getItem('formData'))
      setName(n)
      setBirthDate(b)
      setLifeExpectancy(parseInt(e))
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setData(calculateTimeLeft(birthDate, lifeExpectancy))
    }, 1000)
    return () => { clearInterval(interval) }
  }, [birthDate, lifeExpectancy])

  return (
    <Layout>
      {showModal && (
        <Portal handleCloseModal={handleToggleModal}>
          <Form name={name} setName={setName} lifeExpectancy={lifeExpectancy} setLifeExpectancy={setLifeExpectancy} handleUpdateData={handleUpdateData} handleCloseModal={handleToggleModal} />
        </Portal>
      )}
      <Hero resetData={resetData} handleToggleModal={handleToggleModal} name={name} data={data} percentage={percentage} />
      <Clocks data={data} />
      <Calendar lifeExpectancy={lifeExpectancy} data={data} />
      <Summary lifeExpectancy={lifeExpectancy} birthDate={birthDate} />
    </Layout>
  )
}

export default App
