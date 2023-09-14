const sendDataToServer = async (value) => {
    try {
      const response = await fetch('/publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: value }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Data sent successfully:', data);
      } else {
        console.error('Error sending data:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  export {sendDataToServer}