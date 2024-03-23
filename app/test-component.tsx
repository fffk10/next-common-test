'use client'

import { useState } from 'react'

function Cell({
  value,
  row,
  col,
  save,
}: {
  value: string
  row: number
  col: number
  save: (value: string, row: number, col: number) => void
}) {
  const [editValue, setEditValue] = useState(value)
  const [isEdit, setIsEdit] = useState(false)

  const cellClick = () => {
    setIsEdit(true)
  }

  const change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(event.target.value)
  }

  const enter = () => {
    setIsEdit(false)
    save(editValue, row, col)
  }

  return (
    <td onClick={cellClick}>
      {isEdit ? (
        <>
          <input type='text' value={editValue} onChange={change} />
          <button onClick={enter}>確定</button>
        </>
      ) : (
        <>{value}</>
      )}
    </td>
  )
}

function WorkSheet() {
  const [cells, setCells] = useState([
    ['1-1', '1-2', '1-3'],
    ['2-1', '2-2', '2-3'],
    ['3-1', '3-2', '3-3'],
  ])

  const save = (value, row, col) => {
    const newCells = [...cells]
    newCells[row][col] = value
    setCells(newCells)
  }

  console.log(cells)
  return (
    <table>
      <tbody>
        {cells.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <Cell
                key={`${i}_${j}`}
                value={cell}
                row={i}
                col={j}
                save={save}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default function TestComponent() {
  return (
    <>
      <WorkSheet />
    </>
  )
}
