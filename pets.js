(function() {
  let fs = require('fs');
  let arg = process.argv[2] || 'msg';
  const FILE_PATH = './pets.json'
  let petData = JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'));

  let petShop = {

    msg: function() {
      console.error('Usage: node pets.js [read | create | update | destroy]');
      process.exit(1)
    },

    read: function() {
      let index = process.argv[3] || 'full';
        // let petData = JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'));
        if (index === 'full') {
          console.log(petData);
        } else if (index >= 0 && index < petData.length) {
          console.log(petData[index]);
        } else {
          console.error('Usage: node pets.js read INDEX');
          process.exit(1)
        }
    },

    create: function() {
      if (process.argv[3] && process.argv[4] && process.argv[5]) {
        petData.push({
          "age": parseInt(process.argv[3]),
          "kind": process.argv[4],
          "name": process.argv[5]
        });
        console.log(petData[petData.length-1]);
        fs.writeFileSync(FILE_PATH,JSON.stringify(petData));


      } else {
        console.error('Usage: node pets.js create AGE KIND NAME');
        process.exit(1)
      }
    }
  };

  petShop[arg]();

}());
