import { useDispatch, useSelector } from 'react-redux'
import { decrement, ICounterStore, increment } from '@/store/counter'
import { RootState } from '@/store'
import styles from './HomePage.module.scss'
import { Button, Flex } from 'antd'
function HomePage() {
  const { value } = useSelector<RootState, ICounterStore>((s) => s.counter)
  const dispatch = useDispatch()

  return (
    <div className={styles.home}>
      <p className='text-4xl text-red-500 mb-2'>Mezon Top Board</p>
      <Flex gap={10}>
        <Button color='primary' variant='solid' onClick={() => dispatch(increment())}>
          Up
        </Button>
        <Button color='danger' variant='solid' onClick={() => dispatch(decrement())}>
          Down
        </Button>
      </Flex>
      <p className='mt-2'>{value}</p>
    </div>
  )
}

export default HomePage
