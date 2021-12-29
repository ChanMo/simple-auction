import React, { useState, useEffect } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { ethers } from 'ethers'
import { getAuction } from './utils'

const auction = getAuction(true)

function App() {
  const [amount, setAmount] = useState(0)
  const [beneficiary, setBeneficiary] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const [highestBid, setHighestBid] = useState(0)
  const [highestBidder, setHighestBidder] = useState(null)

  useEffect(() => {
    const initContract = async() => {
      //const auction = getAuction()
      const beneficiaryAddress = await auction.beneficiary()
      setBeneficiary(beneficiaryAddress)
      const auctionEndTime = await auction.auctionEndTime()
      setEndTime((new Date(parseInt(auctionEndTime.toString())*1000)).toString())
      const highestBidderAddress = await auction.highestBidder()
      setHighestBidder(highestBidderAddress)

      const highestBidAmount = await auction.highestBid()
      setHighestBid(ethers.utils.formatEther(highestBidAmount.toString()))
    }
    initContract()
  }, [])

  const handleBid = async() => {
    const value = ethers.utils.parseEther(amount.toString())
    const res = await auction.bid({value: value})
    console.log(res)
  }

  const handleWithdraw = async() => {
    const res = await auction.withdraw()
    console.log(res)
  }

  const handleEnd = async() => {
    const res = await auction.auctionEnd()
    console.log(res)
  }

  const handleChange = (event) => {
    setAmount(event.target.value)
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h3" component="h1" sx={{mt:3,mb:2}}>
        SimpleAuction
      </Typography>
      <Typography>ContractAddress: {auction.address}</Typography>
      <Typography>Beneficiary: {beneficiary}</Typography>
      <Typography>EndTime: {endTime}</Typography>
      <Typography>HighestBidder: {highestBidder}</Typography>
      <Typography>HighestBid: {highestBid}</Typography>
      <Stack spacing={1}>
        <Typography variant="h5">Bid Form</Typography>
        <TextField
          type="number"
          helperText="unit: ETH"
          onChange={handleChange}
          value={amount}
        />
        <Button
          onClick={handleBid}
          variant="contained">
          Bid
        </Button>
      </Stack>
      <Stack spacing={2} direction="row" sx={{my:2}}>
        <Button
          onClick={handleWithdraw}
          variant="outlined">Withdraw</Button>
        <Button
          onClick={handleEnd}
          variant="outlined">Make End</Button>
      </Stack>
    </Container>
  );
}

export default App;
