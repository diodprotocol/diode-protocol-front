import Head from 'next/head'
import Image from 'next/image'
import { Page } from '../components/common/page'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <Page>
      <h1 className="text-2xl">
        Welcome to Diod Protocol
      </h1>
    </Page>
  )
}
