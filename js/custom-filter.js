// document.addEventListener("DOMContentLoaded", function() {
//     // Function to filter projects
//     function filterProjects(category) {
//         document.querySelectorAll('.project-item').forEach(function(item) {
//             if (category === 'All' || item.classList.contains(category)) {
//                 item.style.display = 'block';
//             } else {
//                 item.style.display = 'none';
//             }
//         });
//     }

//     // Event listeners for category buttons
//     document.querySelectorAll('.category-selector').forEach(function(button) {
//         button.addEventListener('click', function() {
//             filterProjects(button.getAttribute('data-category'));
//         });
//     });
// });


document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll('.category-selector');
  const projects = document.querySelectorAll('.project-item');

  function filterProjects(category) {
    projects.forEach(project => {
      if (category === 'All' || project.classList.contains(category)) {
        project.style.display = '';
      } else {
        project.style.display = 'none';
      }
    });
  }

  buttons.forEach(button => {
    button.addEventListener('click', () => filterProjects(button.getAttribute('data-category')));
  });
});

