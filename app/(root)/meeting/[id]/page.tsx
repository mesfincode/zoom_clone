import React from 'react'

const Meeting = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      Meeting
      <div>My Post: {params.id}</div>
    </div>
  )
}

export default Meeting
