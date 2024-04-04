import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { exec } from 'child_process';

export default function handler(req, res) {
    let inputValue = req.body.input
    const fileId = uuidv4(); // Generate a unique file ID
    const filename = `${fileId}.yml`; // Filename with .yml extension
    const filepath = `./public/${filename}`; // File path relative to the public directory

    // Write inputValue to a YAML file locally
    fs.writeFileSync(filepath, inputValue);

    exec(`ie --manifest ${filepath}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing command: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`Command stderr: ${stderr}`);
          return;
        }
        inputValue = stdout
        // Display the output of the command
  
        // Delete the YAML file after executing the command
        fs.unlinkSync(filepath);
        res.status(200).json(inputValue );
      });

  
  }