var webPushConfig = {
  publicKey:
    "BIsf3uNnUy6qnMlP0d9JSj5d9zq3CSSlSNK_WE_hIkM05JuanGwXaMnnQK74k4oEChcfiEkSbSRtrWH-a1uyHEU",
  privateKey: "7VPFh4pnT25FTNnPOR24b4yXFhSp-g3XDp21TpAM89I"
};

// Periksa fitur Notification API
if ("Notification" in window) {
  requestPermission();
  if ("PushManager" in window) {
    navigator.serviceWorker.getRegistration().then(function(registration) {
      registration.pushManager
        .subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(webPushConfig.publicKey)
        })
        .then(function(subscribe) {
          showWarning(
            "Berhasil melakukan subscribe dengan endpoint: ",
            subscribe.endpoint
          );
          showWarning(
            "Berhasil melakukan subscribe dengan p256dh key: ",
            btoa(
              String.fromCharCode.apply(
                null,
                new Uint8Array(subscribe.getKey("p256dh"))
              )
            )
          );
          showWarning(
            "Berhasil melakukan subscribe dengan auth key: ",
            btoa(
              String.fromCharCode.apply(
                null,
                new Uint8Array(subscribe.getKey("auth"))
              )
            )
          );
        })
        .catch(function(e) {
          showWarning("Tidak dapat melakukan subscribe ", e.message);
        });
    });
  }
} else {
  showWarning("Browser tidak mendukung notifikasi.");
}

// Meminta ijin menggunakan Notification API
function requestPermission() {
  Notification.requestPermission().then(function(result) {
    if (result === "denied") {
      showWarning("Fitur notifikasi tidak diijinkan.");
      return;
    } else if (result === "default") {
      showWarning("Pengguna menutup kotak dialog permintaan ijin.");
      return;
    }

    showWarning("Fitur notifikasi diijinkan.");
  });
}

function showNotifikasiSederhana() {
  const title = "Notifikasi Sederhana";
  const options = {
    body: "Ini adalah konten notifikasi. \nBisa menggunakan baris baru."
  };
  if (Notification.permission === "granted") {
    navigator.serviceWorker.ready.then(function(registration) {
      registration.showNotification(title, options);
    });
  } else {
    showWarning("FItur notifikasi tidak diijinkan.");
  }
}

function showNotifikasiIkon() {
  const title = "Notifikasi Sederhana";
  const options = {
    body: "Ini adalah konten notifikasi dengan gambar ikon.",
    icon: "/images/icon-128.png"
  };
  if (Notification.permission === "granted") {
    navigator.serviceWorker.ready.then(function(registration) {
      registration.showNotification(title, options);
    });
  } else {
    showWarning("Fitur notifikasi tidak diijinkan.");
  }
}

function showNotifikasiBadge() {
  const title = "Notifikasi dengan Badge";
  const options = {
    body: "Ini adalah konten notifikasi dengan gambar badge.",
    badge: "/images/icon-128.png"
  };
  if (Notification.permission === "granted") {
    navigator.serviceWorker.ready.then(function(registration) {
      registration.showNotification(title, options);
    });
  } else {
    showWarning("Fitur notifikasi tidak diijinkan.");
  }
}

function showNotifikasiGambar() {
  const title = "Notifikasi dengan Gambar";
  const options = {
    body: "Ini adalah konten notifikasi dengan gambar latar.",
    image: "/images/munchkin.jpg"
  };
  if (Notification.permission === "granted") {
    navigator.serviceWorker.ready.then(function(registration) {
      registration.showNotification(title, options);
    });
  } else {
    showWarning("Fitur notifikasi tidak diijinkan.");
  }
}

function showNotifikasiActions() {
  const title = "Notifikasi dengan Actions";
  const options = {
    body: "Ini adalah konten notifikasi dengan pilihan actions.",
    actions: [
      {
        action: "yes-action",
        title: "Ya"
      },
      {
        action: "no-action",
        title: "Tidak"
      }
    ]
  };
  if (Notification.permission === "granted") {
    navigator.serviceWorker.ready.then(function(registration) {
      registration.showNotification(title, options);
    });
  } else {
    showWarning("Fitur notifikasi tidak diijinkan.");
  }
}

function showNotifikasiTag() {
  const title1 = "Notifikasi dengan Tag - 1";
  const options1 = {
    body: "Anggota tag 1",
    tag: "message-group-1"
  };
  // notifikasi kedua
  const title2 = "Notifikasi dengan Tag - 2";
  const options2 = {
    body: "Anggota tag 2",
    tag: "message-group-2"
  };
  // notifikasi ketiga
  const title3 = "Notifikasi dengan Tag - 3";
  const options3 = {
    body: "Anggota tag 1",
    tag: "message-group-1"
  };
  if (Notification.permission === "granted") {
    navigator.serviceWorker.ready.then(function(registration) {
      registration.showNotification(title1, options1);
      registration.showNotification(title2, options2);
      registration.showNotification(title3, options3);
    });
  } else {
    showWarning("Fitur notifikasi tidak diijinkan.");
  }
}

function showNotifikasiRenotify() {
  const title = "Notifikasi dengan Renotify";
  const options = {
    body: "Renotify",
    tag: "message-group-1",
    renotify: true
  };
  const title2 = "Notifikasi dengan Tag - 2";
  const options2 = {
    body: "Anggota tag 2",
    tag: "message-group-2"
  };
  if (Notification.permission === "granted") {
    navigator.serviceWorker.ready.then(function(registration) {
      registration.showNotification(title, options);
      registration.showNotification(title2, options2);
    });
  } else {
    showWarning("Fitur notifikasi tidak diijinkan.");
  }
}

function showNotifikasiSilent() {
  const title = "Notifikasi senyap";
  const options = {
    silent: true
  };
  if (Notification.permission === "granted") {
    navigator.serviceWorker.ready.then(function(registration) {
      registration.showNotification(title, options);
    });
  } else {
    showWarning("Fitur notifikasi tidak diijinkan.");
  }
}

function showWarning(text, data) {
  if (data) {
    console.log(text, data);
  } else {
    console.log(text);
  }
  document.getElementById("notification-warning").innerText = text;
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
