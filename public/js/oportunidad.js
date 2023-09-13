async function creaKanban(Tipo) {

  let boards;
  const kanbanSidebar = document.querySelector('.kanban-update-item-sidebar'),
    kanbanWrapper = document.querySelector('.kanban-wrapper'),
    commentEditor = document.querySelector('.comment-editor'),
    kanbanAddNewBoard = document.querySelector('.kanban-add-new-board'),
    kanbanAddNewInput = [].slice.call(document.querySelectorAll('.kanban-add-board-input')),
    kanbanAddBoardBtn = document.querySelector('.kanban-add-board-btn'),
    datePicker = document.querySelector('#due-date'),
    select2 = $('.select2'), // ! Using jquery vars due to select2 jQuery dependency
    assetsPath = document.querySelector('html').getAttribute('data-assets-path');
  $('.kanban-wrapper').empty()
  // Init kanban Offcanvas
  const kanbanOffcanvas = new bootstrap.Offcanvas(kanbanSidebar);
  // Get kanban data
  // Get kanban data
  const kanbanResponse = await fetch(assetsPath + 'json/kanban.json');
  if (!kanbanResponse.ok) {
    console.error('error', kanbanResponse);
  }
  boards = await kanbanResponse.json();

  // datepicker init
  if (datePicker) {
    datePicker.flatpickr({
      monthSelectorType: 'static',
      altInput: false,
      altFormat: 'j F, Y',
      dateFormat: 'Y-m-d'
    });
  }

  //! TODO: Update Event label and guest code to JS once select removes jQuery dependency
  // select2
  if (select2.length) {
    function renderLabels(option) {
      if (!option.id) {
        return option.text;
      }
      var $badge = "<div class='badge " + $(option.element).data('color') + " rounded-pill'> " + option.text + '</div>';
      return $badge;
    }

    select2.each(function() {
      var $this = $(this);
      $this.wrap("<div class='position-relative'></div>").select2({
        placeholder: 'Select Label',
        dropdownParent: $this.parent(),
        templateResult: renderLabels,
        templateSelection: renderLabels,
        escapeMarkup: function(es) {
          return es;
        }
      });
    });
  }

  // Comment editor
  if (commentEditor) {
    new Quill(commentEditor, {
      modules: {
        toolbar: '.comment-toolbar'
      },
      placeholder: 'Write a Comment... ',
      theme: 'snow'
    });
  }
  function Money(value) {
    return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  }
  // Render board dropdown
  function renderMoney(elem) {
    return ("<small> $ " + Money(elem.parentElement.classList[1]) + "</small>");
  }
  function renderProducto(tbl) {
    return ("");
  }
  // Render item dropdown
  function renderDropdown() {
    return (
      "<div class='dropdown kanban-tasks-item-dropdown'>" +
      "<i class='dropdown-toggle bx bx-dots-vertical-rounded' id='kanban-tasks-item-dropdown' data-bs-toggle='dropdown' aria-haspopup='true' aria-expanded='false'></i>" +
      "<div class='dropdown-menu dropdown-menu-end' aria-labelledby='kanban-tasks-item-dropdown'>" +
      "<a class='dropdown-item' href='javascript:void(0)'>Copy task link</a>" +
      "<a class='dropdown-item' href='javascript:void(0)'>Duplicate task</a>" +
      "<a class='dropdown-item delete-task' href='javascript:void(0)'>Delete</a>" +
      '</div>' +
      '</div>'
    );
  }
  // Render header

  function renderHeader(color, text) {
    return (
      "<div class='d-flex justify-content-between flex-wrap align-items-center mb-2 pb-1'>" +
      "<div class='item-badges'> " +
      "<div class='badge rounded-pill bg-label-"+(color === "Fria" ? "info" : color === "Caliente" ? "warning" : color === "Aceptada" ? "primary" : color === "Ganada" ? "success" : "danger")+"'>$" + Money(text) + "</div></div></div>"
    );
  }
  // Render avatar
  function renderAvatar(images, pullUp, size, margin, members) {
    var $transition = pullUp ? ' pull-up' : '',
      $size = size ? 'avatar-' + size + '' : '',
      member = members == undefined ? ' ' : members.split(',');

    return images == undefined
      ? ' '
      : images
        .split(',')
        .map(function(img, index, arr) {
          var $margin = margin && index !== arr.length - 1 ? ' me-' + margin + '' : '';

          return (
            "<div class='avatar " +
            $size +
            $margin +
            "'" +
            "data-bs-toggle='tooltip' data-bs-placement='top'" +
            "title='" +
            member[index] +
            "'" +
            '>' +
            "<span alt='Avatar' class='rounded-circle bg-label-primary avatar-initial" +
            $transition +
            "'>" + Initials(img) +
            '</span></div>'
          );
        })
        .join(' ');
  }
  // Render footer
  function Initials(v1) {
    let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');
    let initials = [...v1.matchAll(rgx)] || [];
    initials = (
      (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
    ).toUpperCase();
    return initials
  }
  function renderFooter(date,assigned, members) {
    return (
      "<div class='d-flex justify-content-between align-items-center flex-wrap mt-2 pt-1'><div class='d-flex'><small>" + date + "</small></div>" +
      "<div class='d-flex'>" +
      "<span class='d-flex align-items-center me-2'>" + '<a href="#" data-bs-toggle="modal" data-bs-target="#invoice" class="text-body text-truncate fw-semibold"><i class="bx bx-paperclip me-1"></i></a>' + "</span>" +
      "<span class='d-flex align-items-center'>" + '<a href="#" data-bs-toggle="offcanvas" data-bs-target="#addEventSidebar" class="text-body text-truncate fw-semibold"><i class="bx bx-task me-1"></i></a>' + "</span>" +
      "<span class='d-flex align-items-center'>" + '<a href="#" data-bs-toggle="offcanvas" data-bs-target="#edit" class="text-body text-truncate fw-semibold"><i class="bx bx-pencil me-1"></i></a>' + "</span></div>" +
      "<div class='avatar-group d-flex align-items-center assigned-avatar'>" +
      renderAvatar(assigned, true, 'xs', null, members) +
      '</div>' +
      '</div>'
    );
  }
  // Init kanban
  const kanban = new jKanban({
    element: '.kanban-wrapper',
    gutter: '30px',
    widthBoard: '250px',
    dragItems: true,
    boards: boards,
    dragBoards: true,
    addItemButton: true,
    itemAddOptions: {
      enabled: false, // add a button to board for easy item creation
      content: '+ Agregar Oportunidad', // text or html content of the board button
      class: 'kanban-title-button nueva-oportunidad btn btn-default btn-xs', // default class of the button
      footer: false // position the button on footer
    },
    click: function(el) {
      console.log(el)
    },
    buttonClick: function(el, boardId) {
      let offCanvasElementOP = document.querySelector('#nueva-oportunidad');
      $("#estatusID").val(boardId).hide()
      $("#nombreContactoOP").hide();
      $("#titularOP").hide();
      let offCanvasElOP = new bootstrap.Offcanvas(offCanvasElementOP);
      // Empty fields on offCanvas open
      (offCanvasElementOP.querySelector('.dt-fields').value = '');
      // Open offCanvas with form
      offCanvasElOP.show();
    },
    dropEl: async function(el, target, source, sibling) {
      let trgid = target.parentElement.getAttribute('data-id');
      let elid = el.getAttribute('data-eid');
      if (trgid === "63d1fee73961d517c269a347") {
        const { value: motivo } = await Swal.fire({
          title: 'Detalla el motivo de la perdida',
          input: 'text',
          inputPlaceholder: 'motivo'
        })
        if (motivo) {
          $.post('/oportunidadUpdate', { idEstatus: trgid, cliente: elid, motivo: `${motivo}` },
            function(returnedData) {
              location.reload();
            });
        }
      } else {
        $.post('/oportunidadUpdate', { idEstatus: trgid, cliente: elid },
          function(returnedData) {
            location.reload();
          });

      }
    },
  });

  // Kanban Wrapper scrollbar
  if (kanbanWrapper) {
    new PerfectScrollbar(kanbanWrapper);
  }

  const kanbanContainer = document.querySelector('.kanban-container'),
    kanbanTitleBoard = [].slice.call(document.querySelectorAll('.kanban-title-board')),
    kanbanItem = [].slice.call(document.querySelectorAll('.kanban-item'));

  // Render custom items
  if (kanbanItem) {
    kanbanItem.forEach(function(el) {
      const element = "<span class='kanban-text'>" + el.textContent + '</span>';
      let img = '';
      if (el.getAttribute('data-image') !== null) {
        img = "<img class='img-fluid rounded-3 mb-2' src='" + assetsPath + 'img/elements/' + el.getAttribute('data-image') + "'>";
      }
      el.textContent = '';
      if (el.getAttribute('data-badge') !== undefined && el.getAttribute('data-badge-text') !== undefined) {
        el.insertAdjacentHTML(
          'afterbegin',
          renderHeader(el.getAttribute('data-estatusOportunidad'), el.getAttribute('data-totalstr')) + img + element
        );
      }
      el.insertAdjacentHTML(
        'beforeend',
        renderProducto(el.getAttribute('data-producto'))
      );
      if (
        el.getAttribute('data-comments') !== undefined ||
        el.getAttribute('data-due-date') !== undefined ||
        el.getAttribute('data-assigned') !== undefined
      ) {
        el.insertAdjacentHTML(
          'beforeend',
          renderFooter(
            el.getAttribute('data-due-date'),
            el.getAttribute('data-assigned'),
            el.getAttribute('data-members')
          )
        );
      }
    });
  }

  // To initialize tooltips for rendered items
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // prevent sidebar to open onclick dropdown buttons of tasks
  const tasksItemDropdown = [].slice.call(document.querySelectorAll('.kanban-tasks-item-dropdown'));
  if (tasksItemDropdown) {
    tasksItemDropdown.forEach(function(e) {
      e.addEventListener('click', function(el) {
        el.stopPropagation();
      });
    });
  }

  // Toggle add new input and actions add-new-btn
  if (kanbanAddBoardBtn) {
    kanbanAddBoardBtn.addEventListener('click', () => {
      kanbanAddNewInput.forEach(el => {
        el.value = '';
        el.classList.toggle('d-none');
      });
    });
  }

  // Render add new inline with boards

  // Makes kanban title editable for rendered boards
  if (kanbanTitleBoard) {
    kanbanTitleBoard.forEach(function(elem) {
      elem.addEventListener('mouseenter', function() {
        this.contentEditable = 'true';
      });
      elem.insertAdjacentHTML('beforeend', renderMoney(elem));
    });
  }
  // Delete task for rendered boards
  const deleteTask = [].slice.call(document.querySelectorAll('.delete-task'));
  if (deleteTask) {
    deleteTask.forEach(function(e) {
      e.addEventListener('click', function() {
        const id = this.closest('.kanban-item').getAttribute('data-eid');
        kanban.removeElement(id);
      });
    });
  }

  // Cancel btn add new input
  const cancelAddNew = document.querySelector('.kanban-add-board-cancel-btn');
  if (cancelAddNew) {
    cancelAddNew.addEventListener('click', function() {
      kanbanAddNewInput.forEach(el => {
        el.classList.toggle('d-none');
      });
    });
  }

  // Add new board
  if (kanbanAddNewBoard) {
    kanbanAddNewBoard.addEventListener('submit', function(e) {
      e.preventDefault();
      const thisEle = this,
        value = thisEle.querySelector('.form-control').value,
        id = value.replace(/\s+/g, '-').toLowerCase();
      kanban.addBoards([
        {
          id: id,
          title: value
        }
      ]);

      // Adds delete board option to new board, delete new boards & updates data-order
      const kanbanBoardLastChild = document.querySelectorAll('.kanban-board:last-child')[0];
      if (kanbanBoardLastChild) {
        const header = kanbanBoardLastChild.querySelector('.kanban-title-board');
        header.insertAdjacentHTML('afterend', renderBoardDropdown());

        // To make newly added boards title editable
        kanbanBoardLastChild.querySelector('.kanban-title-board').addEventListener('mouseenter', function() {
          this.contentEditable = 'true';
        });
      }

      // Add delete event to delete newly added boards
      const deleteNewBoards = kanbanBoardLastChild.querySelector('.delete-board');
      if (deleteNewBoards) {
        deleteNewBoards.addEventListener('click', function() {
          const id = this.closest('.kanban-board').getAttribute('data-id');
          kanban.removeBoard(id);
        });
      }

      // Remove current append new add new form
      if (kanbanAddNewInput) {
        kanbanAddNewInput.forEach(el => {
          el.classList.add('d-none');
        });
      }

      // To place inline add new btn after clicking add btn
      if (kanbanContainer) {
        kanbanContainer.appendChild(kanbanAddNewBoard);
      }
    });
  }

  // Clear comment editor on close
  kanbanSidebar.addEventListener('hidden.bs.offcanvas', function() {
    kanbanSidebar.querySelector('.ql-editor').firstElementChild.innerHTML = '';
  });

  // Re-init tooltip when offcanvas opens(Bootstrap bug)
  if (kanbanSidebar) {
    kanbanSidebar.addEventListener('shown.bs.offcanvas', function() {
      const tooltipTriggerList = [].slice.call(kanbanSidebar.querySelectorAll('[data-bs-toggle="tooltip"]'));
      tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
      });
    });
  }
}

$(document).on('click', '.nuevo', function() {
  let offCanvasElementOP = document.querySelector('#nueva-oportunidad');
  let cliente = $(this).data('nombreCliente')
  let contacto = $(this).data('nombreContacto')
  let titular = $(this).data('titular')
  console.log(titular)

  let offCanvasElOP = new bootstrap.Offcanvas(offCanvasElementOP);
  // Empty fields on offCanvas open
  (offCanvasElementOP.querySelector('.dt-fields').value = '');
  // Open offCanvas with form
  offCanvasElOP.show();
});
$(document).ready(async function() {
  $(".table-switch").hide()
  $(".switch-input").on("change", function() {
    $(".table-switch").toggle()
    $(".app-kanban").toggle()
  })

  creaKanban("Venta")
  const kanbanSidebar = document.querySelector('.kanban-update-item-sidebar'),
    invoicemodel = document.querySelector('.invocie')
  const kanbanOffcanvas = new bootstrap.Offcanvas(kanbanSidebar);
  function invoice() {
    invoicemodel.show();
  }
  function seguimiento() {
    kanbanOffcanvas.show();
  }
})