import './navigation.css';

const navigationListMarkup = (elements) => {
  return `
    <ul class="navigationList">
        ${navigationListItemMarkup(elements)}
    </ul>
    `
}
const navigationListItemMarkup = (elements) => {
  return elements.reduce((acc, element) => {
    acc += `
      <li class="navigationListItem" data-navigationlink="${element}">
        <a href="#">${element}</a>
      </li>`
    return acc;
  }, '')
}


export default {
  refs: {},
  activeLinks: {},

  createLinks(destination, elements) {
    this.refs[destination.classList[0]] = destination;
    destination.innerHTML = navigationListMarkup(elements);
    const activeLink = destination.querySelector('[data-navigationlink]');
    activeLink.classList.add('activeLink');
    this.activeLinks[destination.classList[0]] = activeLink;
  },

  getActiveLink(e) {
    e.preventDefault();
    if (e.target.nodeName === 'LI' || e.target.nodeName === "A") {
      const dataAttribute = e.target.dataset.navigationlink
      ? e.target.dataset.navigationlink
      : e.target.closest('[data-navigationlink]').dataset.navigationlink;
      this.setActiveLink(e, dataAttribute);
      return dataAttribute;
    }
  },

  setActiveLink(e, dataAttribute) {
    this.activeLinks[e.currentTarget.classList[0]].classList.remove('activeLink');
    const target = this.refs[e.currentTarget.classList[0]].querySelector(`[data-navigationlink=${dataAttribute}]`);
    target.classList.add('activeLink');
    this.activeLinks[e.currentTarget.classList[0]] = target;
    // console.log(this)
  }
}



// For use
// 1. Create data
// const elements = ['Home', 'About', 'Contacts', 'Products', 'Cart'];

// 2. Get ref
// const headerNavigation = document.querySelector('.headerNavigation');


// const getPage = (e) => {
//   const link = navigation.getActiveLink(e)
//   console.log(link)
// }

// 3. Get event
// navigation.createLinks(headerNavigation, elements);
// headerNavigation.addEventListener('click', getPage);









