let zip = new JSZip();
let fileCount = 0;
let processedFiles = 0;

function chooseFile() {
  document.getElementById('upload-btn').click();
}

document.getElementById('upload-btn').addEventListener('change', function(e) {
  var file = e.target.files[0];

  var zip = new JSZip();
  zip.loadAsync(file).then(function(zip) {
    zip.forEach(function(relativePath, zipEntry) {
      var listItem = document.createElement('li');
      var fileIcon = document.createElement('span');
      var fileName = document.createElement('span');

      fileIcon.classList.add('file-icon');
      fileIcon.innerText = zipEntry.dir ? 'none' : 'none';

      fileName.innerText = relativePath;

      listItem.appendChild(fileIcon);
      listItem.appendChild(fileName);

      document.getElementById('file-list').appendChild(listItem);

      listItem.addEventListener('click', function() {
        if (!zipEntry.dir) {
          zipEntry.async('string').then(function(content) {
            document.getElementById('file-content').value = content;
            document.getElementById('file-content').removeAttribute('disabled');
            document.getElementById('save-btn').style.display = 'block';
          });
        }
      });
    });

    fileCount = zip.files.length;
    processedFiles = 0;

    document.getElementById('download-btn').disabled = false;
  });
});

function addFile() {
  let fileName = prompt('Inserir pasta/arquivo:', 'pasta/a/file.txt');
  let fileContent = ""; // inicialmente vazio

  if (fileName) {
    let listItem = document.createElement('li');
    let fileIcon = document.createElement('span');
    let fileLabel = document.createElement('span');

    fileIcon.classList.add('file-icon');
    if (fileName.endsWith('/')) {
      fileIcon.innerText = '📁'; // ícone de pasta
    } else {
      fileIcon.innerText = '📄'; // ícone de arquivo
    }

    fileLabel.innerText = fileName;

    listItem.appendChild(fileIcon);
    listItem.appendChild(fileLabel);

    document.getElementById('file-list').appendChild(listItem);

    listItem.addEventListener('click', function() {
      if (!fileLabel.innerText.endsWith('/')) {
        document.getElementById('file-content').value = fileContent;
        document.getElementById('file-content').removeAttribute('disabled');
        document.getElementById('save-btn').style.display = 'block';
        // Aqui você pode gravar o conteúdo anterior, se desejar

        document.getElementById('download-btn').disabled = false; // Habilitar o botão de download
      }
    });

    // Adicione o evento de alteração de conteúdo 
    // Somente se o conteúdo existir (ou seja, se não for um diretório)
    if (!fileName.endsWith('/')) {
      document.getElementById('file-content').addEventListener('input', function() {
        fileContent = this.value; // Atualizar o conteúdo do arquivo
      });
    }

    zip.file(fileName, fileContent); // Adicionar o arquivo ao ZIP

    processedFiles++;

    document.getElementById('file-content').setAttribute('disabled', true);
    document.getElementById('file-content').value = '';

    if (processedFiles === fileCount) {
      document.getElementById('save-btn').style.display = 'none';
    }
  }
}

function saveContent() {
  var content = document.getElementById('file-content').value;
  let fileName = prompt('Digite o caminho/arquivo para salvar:', 'pasta/a/file.txt');
  
  if (fileName) {
    let listItem = document.createElement('li');
    let fileNameSpan = document.createElement('span');

    fileNameSpan.innerText = fileName;
    listItem.appendChild(fileNameSpan);
    document.getElementById('file-list').appendChild(listItem);

    zip.file(fileName, content);

    processedFiles++;

    document.getElementById('file-content').setAttribute('disabled', true);
    document.getElementById('file-content').value = '';

    if (processedFiles === fileCount) {
      document.getElementById('save-btn').style.display = 'none';
    }
  }
}

function downloadZIP() {
  zip.generateAsync({ type: "blob" }).then(function(content) {
    var nomeZip = prompt("Digite o nome do seu patch:", "Patch_Gerado");
    if (nomeZip) {
      var link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = nomeZip + ".zip";
      link.click();
    }
  });
}