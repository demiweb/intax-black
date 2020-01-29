// import MySelect from './MySelect'
import CustomSelect from 'select-custom'
import classNames from '../../classNames'
import filterSearch from './filterSearch'

export default () => {
  const selects = [...document.querySelectorAll(`.${classNames.select}`)]
  if (!selects.length) return

  const searchIcon =
    '<svg height="1em" viewBox="0 0 515.558 515.558" width="1.000em" class="icon icon-magnifying-glass"><path d="M378.344 332.78c25.37-34.645 40.545-77.2 40.545-123.333C418.889 93.963 324.928.002 209.444.002S0 93.963 0 209.447s93.961 209.445 209.445 209.445c46.133 0 88.692-15.177 123.337-40.547l137.212 137.212 45.564-45.564L378.344 332.78zm-168.899 21.667c-79.958 0-145-65.042-145-145s65.042-145 145-145 145 65.042 145 145-65.043 145-145 145z"/></svg>'

  const options = {
    default: {},
    with_search: {
      panelItem: {
        position: 'top',
        item: `${searchIcon}<input type="text" class="js-search" placeholder="" />`,
      },
    },
  }

  selects.forEach(select => {
    if (
      select.parentNode &&
      select.parentNode.classList &&
      select.parentNode.classList.contains('custom-select')
    )
      return

    const name = select.dataset.type
    const mySelect = new CustomSelect(select, options[name])
    mySelect.init()

    const wrap = select.parentNode
    const search = wrap.querySelector('.js-search')
    const customOptions = [...wrap.querySelectorAll('.custom-select__option')]

    filterSearch(search, customOptions)

    select.parentNode.setAttribute('tabindex', '0')
  })
}
