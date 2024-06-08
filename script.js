const form = document.getElementById('powerForm');
const result = document.getElementById('result');
const powerInputs = document.getElementById('powerInputs');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const devices = parseInt(document.getElementById('devices').value);
    const watts = parseInt(document.getElementById('watts').value);
    const volts = parseInt(document.getElementById('volts').value);
    const amps = parseInt(document.getElementById('amps').value);
    const time = parseInt(document.getElementById('time').value);

    if (isNaN(devices) || isNaN(time)) {
        result.textContent = 'Please enter valid values for the number of devices and time.';
        return;
    }

    let power;
    if (!isNaN(watts)) {
        power = watts;
    } else if (!isNaN(volts) && !isNaN(amps)) {
        power = volts * amps;
    } else {
        result.textContent = 'Please enter either watts or volts and amps.';
        return;
    }

    const totalEnergyUsage = (power * devices * time) / (1000 * 60); // kWh
    const costPerKWh = 0.15; // Adjust this value based on your local electricity rate
    const totalCost = totalEnergyUsage * costPerKWh;

    result.textContent = `Total Energy Usage: ${totalEnergyUsage.toFixed(2)} kWh\nTotal Cost: $${totalCost.toFixed(2)}`;
});

document.getElementById('watts').addEventListener('input', function() {
    if (this.value) {
        powerInputs.querySelectorAll('input[type="number"]:not(#watts)').forEach(input => input.value = '');
    }
});

document.getElementById('volts').addEventListener('input', function() {
    if (this.value) {
        document.getElementById('watts').value = '';
    }
});

document.getElementById('amps').addEventListener('input', function() {
    if (this.value) {
        document.getElementById('watts').value = '';
    }
});