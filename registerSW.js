if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/kids-workshop/sw.js', { scope: '/kids-workshop/' })})}