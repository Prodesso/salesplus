/**
 * Tagify
 */

'use strict';

(function() {
  // Custom list & inline suggestion
  //------------------------------------------------------
  const TagifyCustomListSuggestionEl = document.querySelector('.statusMrk');
  // List
  let TagifyCustomListSuggestion = new Tagify(TagifyCustomListSuggestionEl, {
    keepInvalidTags: false,         // do not remove invalid tags (but keep them marked as invalid)
    // createInvalidTags: false,
    editTags: {
      clicks: 2,              // single click to edit a tag
      keepInvalid: false      // if after editing, tag is invalid, auto-revert
    },
    originalInputValueFormat: valuesArr => valuesArr.map(item => item.value).join(','),
    maxTags: 1,
    transformTag: transformTag,
    backspace: "edit",
    placeholder: "Selecciona un estatus",
    dropdown: {
      enabled: 0,            // show suggestion after 1 typed character
      fuzzySearch: false,    // match only suggestions that starts with the typed characters
      position: 'text',      // position suggestions list next to typed text
      caseSensitive: false,   // allow adding duplicate items if their case is different
    },
    templates: {
      dropdownItemNoMatch: function(data) {
        return `<div class='${this.settings.classNames.dropdownItem}' value="noMatch" tabindex="0" role="option">
                    No se encontro: <strong>${data.value}</strong>
                </div>`
      }
    }
  });
  function getRandomColor() {
    function rand(min, max) {
      return min + Math.random() * (max - min);
    }

    var h = rand(1, 360) | 0,
      s = rand(40, 70) | 0,
      l = rand(65, 72) | 0;

    return 'hsl(' + h + ',' + s + '%,' + l + '%)';
  }
  function transformTag(tagData) {
    tagData.color = getRandomColor();
    tagData.style = "--tag-bg:" + tagData.color;

    if (tagData.value.toLowerCase() == 'shit')
      tagData.value = 's✲✲t'
  }
  TagifyCustomListSuggestion.on('add', function(e) {
    console.log(e.detail)
  })
  TagifyCustomListSuggestion.on('invalid', function(e) {
    if (e.detail.message == "number of tags exceeded") {
      let message = "Solo se puede seleccionar un estatus"
    }

  })
  var clickDebounce;
  TagifyCustomListSuggestion.on('click', function(e) {
    const { tag: tagElm, data: tagData } = e.detail;

    // a delay is needed to distinguish between regular click and double-click.
    // this allows enough time for a possible double-click, and noly fires if such
    // did not occur.
    clearTimeout(clickDebounce);
    clickDebounce = setTimeout(() => {
      tagData.color = getRandomColor();
      tagData.style = "--tag-bg:" + tagData.color;
      Tagify.replaceTag(tagElm, tagData);
    }, 200);
  })

  TagifyCustomListSuggestion.on('dblclick', function(e) {
    // when souble clicking, do not change the color of the tag
    clearTimeout(clickDebounce);
  })
})();
