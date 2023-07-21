var i = -1;
var toastCount = 0;
var $toastlast;
function showToast(type, msg) {
    var shortCutFunction = type,
        $showDuration = 300,
        $hideDuration = 1000,
        $timeOut = 5000,
        $extendedTimeOut = 1000,
        $showEasing = 'swing',
        $hideEasing = 'linear',
        $showMethod = 'fadeIn',
        $hideMethod = 'fadeOut',
        toastIndex = toastCount++,
        addClear = true,
        prePositionClass = 'toast-top-full-width';


    toastr.options = {
        maxOpened: 1,
        autoDismiss: true,
        closeButton: true,
        positionClass: prePositionClass,
        preventDuplicates: true,
        onclick: null,
    };

    //Add fix for multiple toast open while changing the position
    if (prePositionClass != toastr.options.positionClass) {
        toastr.options.hideDuration = 0;
        toastr.clear();
    }
    console.log(type)
    var $toast = toastr[type](msg, ''); // Wire up an event handler to a button in the toast, if it exists
    $toastlast = $toast;
    if (typeof $toast === 'undefined') {
        return;
    }
    if ($toast.find('#okBtn').length) {
        $toast.delegate('#okBtn', 'click', function () {
            alert('you clicked me. i was toast #' + toastIndex + '. goodbye!');
            $toast.remove();
        });
    }
    if ($toast.find('#surpriseBtn').length) {
        $toast.delegate('#surpriseBtn', 'click', function () {
            alert('Surprise! you clicked me. i was toast #' + toastIndex + '. You could perform an action here.');
        });
    }
    if ($toast.find('.clear').length) {
        $toast.delegate('.clear', 'click', function () {
            toastr.clear($toast, {
                force: true
            });
        });
    }
}
function getLastToast() {
    return $toastlast;
}