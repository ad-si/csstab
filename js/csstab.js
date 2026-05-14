import Tablesort from "./libs/tablesort.js"
import shaven from "./libs/shaven.min.js"
import {properties} from "./properties.js"
import {selectors} from "./selectors.js"

const build = shaven.default

const getElement = query => document.querySelector(query)

const cleanUp = () => {
  getElement("#content").innerHTML = ""
}

const displayTable = (type, className) => {
  build([getElement("#content"), [`table#.${className}`]])

  build([
    getElement("table"),
    ["thead", ["tr", ["th#.sort-down", "Nr"]]],
  ])

  for (const column of type.structure) {
    build([
      getElement("table thead:last-of-type tr"),
      ["th", column],
    ])
  }

  build([getElement("table"), ["tbody"]])

  let index = 1
  for (const row of type.data) {
    build([
      getElement("table tbody:last-of-type"),
      ["tr", ["td", String(index++)]],
    ])

    for (const rawItem of row) {
      const item = rawItem === true
        ? ["span#.check", "✔"]
        : String(rawItem)

      build([
        getElement("table tbody:last-of-type tr:last-of-type"),
        ["td", item],
      ])
    }
  }

  // Insert thead also in tbody for automatic layouting
  build([
    getElement("table tbody"),
    ["tr#.last", ["th", "Nr"]],
  ])
  for (const column of type.structure) {
    build([getElement("table tr.last"), ["th", column]])
  }

  getElement("table").style.display = "inline-block"

  new Tablesort(document.querySelector("#content table"))

  const bodyCells = document.querySelectorAll("tbody tr:first-of-type td")
  const headCells = document.querySelectorAll("thead tr:first-of-type th")

  // Take over width of layouted header
  for (let i = 0; i < bodyCells.length; i++) {
    headCells[i].style.width = `${bodyCells[i].offsetWidth}px`
  }
}

getElement("#properties").addEventListener("click", () => {
  cleanUp()
  displayTable(properties, "properties")
})

getElement("#selectors").addEventListener("click", () => {
  cleanUp()
  displayTable(selectors, "selectors")
})

displayTable(properties, "properties")
