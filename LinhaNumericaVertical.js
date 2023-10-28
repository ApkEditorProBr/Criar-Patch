function updateLineNumbers() {
    let lineNumberDiv = document.getElementById("vertical_number_line");
    let editorContent = document.getElementById("file-content");

    let lines = editorContent.value.split("\n");
    let lineNumbers = "";

    for (let i = 1; i <= lines.length; i++) {
      lineNumbers += i + "\n";
    }

    lineNumberDiv.innerText = lineNumbers;
  }

  function syncScroll() {
    let lineNumberDiv = document.getElementById("vertical_number_line");
    let editorContent = document.getElementById("file-content");

    lineNumberDiv.scrollTop = editorContent.scrollTop;
  }

  window.addEventListener("DOMContentLoaded", function() {
    updateLineNumbers();
    document.getElementById("file-content").addEventListener("input", updateLineNumbers);
    document.getElementById("file-content").addEventListener("scroll", syncScroll);

    // Chamando a função inicialmente para que a linha vertical fique estática
    updateLineNumbers();
  });