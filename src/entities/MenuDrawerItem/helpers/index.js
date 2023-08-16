export function expansionMenuItemClasses(item, currentPage) {
  return item.dropdownList.some((link) => link.link === currentPage) ? 'router-link-active' : '';
}
