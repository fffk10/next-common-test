'use client'

import { useEffect, useRef, useState } from 'react'

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
  const inputRef = useRef<HTMLInputElement>(null)

  const cellClick = () => {
    setIsEdit(true)
  }

  const change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(event.target.value)
  }

  const enter = () => {
    save(editValue, row, col)
    setIsEdit(false)
  }

  useEffect(() => {
    if (isEdit && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEdit])

  return (
    <td>
      {isEdit ? (
        <>
          <input
            type='text'
            value={editValue}
            onChange={change}
            ref={inputRef}
          />
          <button onClick={enter}>確定</button>
        </>
      ) : (
        <span onClick={cellClick}>{value}</span>
      )}
    </td>
  )
}

function WorkSheet({ searchKeyword }: { searchKeyword: string }) {
  const [cells, setCells] = useState([
    ['1-1', '1-2', '1-3'],
    ['2-1', '2-2', '2-3'],
    ['3-1', '3-2', '3-3'],
  ])

  const save = (value: string, row: number, col: number) => {
    const newCells = [...cells]
    newCells[row][col] = value
    setCells(newCells)
  }

  const filteredRows = searchKeyword
    ? cells.filter((row) => row.some((cell) => cell.includes(searchKeyword)))
    : cells

  console.log(cells)
  return (
    <table>
      <tbody>
        {filteredRows.map((row, i) => (
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
  const [searchKeyword, setSearchKeyword] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const search = () => {
    setSearchKeyword(inputRef.current?.value ?? '')
  }

  return (
    <>
      <input type='text' ref={inputRef} />
      <button onClick={search}>確定</button>
      <WorkSheet searchKeyword={searchKeyword} />
    </>
  )
}
