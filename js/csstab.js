/* global shaven, properties, selectors, Tablesort */
/* eslint-disable prefer-arrow-callback */

(function (window, document) {
  const build = shaven.default
  const state = {
    'table': 'properties',
  }

  function getElement (query) {
    return document.querySelector(query)
  }

  function cleanUp () {
    getElement('#content').innerHTML = ''
  }

  function setState (theState) {
    theState.table = getElement('table').className = theState
  }

  function displayTable (type) {
    function createTable () {
      build([
        getElement('#content'),
        ['table#.properties'],
      ])
    }

    function createTableHead () {
      build([getElement('table'),
        ['thead',
          ['tr',
            ['th#.sort-down', 'Nr'],
          ],
        ],
      ])


      type.structure.forEach(function (column) {
        build([
          getElement('table thead:last-of-type tr'),
          ['th', column],
        ])
      })
    }

    function createBody () {
      build([getElement('table'), ['tbody']])

      let index = 1

      type.data.forEach(function (row) {
        build([
          getElement('table tbody:last-of-type'),
          ['tr',
            ['td', String(index++)],
          ],
        ])

        row.forEach(function (item) {
          if (item === true) {
            item = ['span#.check', '✔']
          }
          else {
            item = String(item)
          }

          build([getElement('table tbody:last-of-type tr:last-of-type'),
            ['td', item],
          ])
        })
      })

      // Insert thead also in tbody for automatic layouting
      for (let loopIndex = -1; loopIndex < type.structure.length; loopIndex++) {
        if (loopIndex === -1) {
          build([getElement('table tbody'),
            ['tr#.last',
              ['th', 'Nr'],
            ],
          ])
        }
        else {
          build([getElement('table tr.last'),
            ['th', type.structure[loopIndex]],
          ])
        }
      }
    }


    if (state.table !== type) {
      createTable()
      createTableHead()
      createBody()

      getElement('table').style.display = 'inline-block'

      // eslint-disable-next-line no-new
      new Tablesort(document.querySelector('#content table'))

      const bodyCells = document.querySelectorAll('tbody tr:first-of-type td')
      const headCells = document.querySelectorAll('thead tr:first-of-type th')

      // Take over width of layouted header
      for (let loopIndex = 0; loopIndex < bodyCells.length; loopIndex++) {
        headCells[loopIndex].style.width =
          bodyCells[loopIndex].offsetWidth + 'px'
      }
    }
  }

  getElement('#properties')
    .addEventListener('click', function () {
      cleanUp()
      displayTable(properties)
      setState('properties')
    })
  getElement('#selectors')
    .addEventListener('click', function () {
      cleanUp()
      displayTable(selectors)
      setState('selectors')
    })

  displayTable(properties)

})(window, document)
