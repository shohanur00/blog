$(document).ready(function () {
  $('#summernote').summernote({
    placeholder: 'এখানে বিস্তারিত কন্টেন্ট লিখুন...',
    tabsize: 2,
    height: 400,
    toolbar: [
      ['style', ['style']],
      ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
      ['fontname', ['fontname']],
      ['fontsize', ['fontsize']],
      ['color', ['color']],
      ['para', ['ul', 'ol', 'paragraph', 'height']],
      ['table', ['table']],
      ['insert', ['link', 'picture', 'video', 'hr']],
      ['view', ['fullscreen', 'codeview', 'help']],
      ['misc', ['undo', 'redo']]
    ]
  });
});
