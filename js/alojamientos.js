'use strict';

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".datepicker").forEach(input => {
        $(input).datepicker({
            format: 'dd/mm/yyyy',
            autoclose: true,
            todayHighlight: true
        });
    });
});