document.addEventListener('DOMContentLoaded', function() {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const previewImage = document.getElementById('previewImage');
    const previewBox = document.getElementById('previewBox');
    const uploadProgress = document.getElementById('uploadProgress');
    const chooseFileBtn = document.getElementById('chooseFile');
  
    // Cloudinary upload URL and preset
    const cloudName = 'YOUR_CLOUD_NAME'; // Ganti dengan Cloudinary Cloud Name kamu
    const uploadPreset = 'YOUR_UPLOAD_PRESET'; // Ganti dengan Upload Preset kamu
  
    // Drag and drop functionality
    dropZone.addEventListener('dragover', function(e) {
      e.preventDefault();
      dropZone.style.backgroundColor = '#e9f7fd';
    });
  
    dropZone.addEventListener('dragleave', function() {
      dropZone.style.backgroundColor = 'transparent';
    });
  
    dropZone.addEventListener('drop', function(e) {
      e.preventDefault();
      handleFile(e.dataTransfer.files[0]);
    });
  
    // Choose file from input
    chooseFileBtn.addEventListener('click', function() {
      fileInput.click();
    });
  
    fileInput.addEventListener('change', function() {
      handleFile(fileInput.files[0]);
    });
  
    // Handle file input (preview image)
    function handleFile(file) {
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          previewImage.src = e.target.result;
          previewBox.style.display = 'block';
          // Upload file to Cloudinary
          uploadToCloudinary(file);
        };
        reader.readAsDataURL(file);
      }
    }
  
    // Simulate file upload with progress bar
    function uploadToCloudinary(file) {
      const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);
  
      uploadProgress.style.display = 'block'; // Show progress bar
      let progress = 0;
      const interval = setInterval(function() {
        if (progress >= 100) {
          clearInterval(interval);
          alert('File uploaded successfully!');
          uploadProgress.style.display = 'none';
        } else {
          progress += 10;
          uploadProgress.value = progress;
        }
      }, 500); // Simulate upload progress
  
      // Perform the actual upload using fetch
      fetch(url, {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        console.log("Upload successful", data);
        // Optional: You can display the uploaded image URL in your gallery or anywhere
        const uploadedImageUrl = data.secure_url;
        console.log("Uploaded Image URL: ", uploadedImageUrl);
      })
      .catch(error => {
        console.error("Error uploading image: ", error);
      });
    }
  });
  