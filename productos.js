const { Builder, By, until } = require('selenium-webdriver');
const fs = require('fs');
const path = require('path');

(async function automationWithSelenium() {
  // Configuración inicial
  let driver = await new Builder().forBrowser('chrome').build();
  const url = 'https://inventory-flutter.vercel.app';

  // Inicia el reporte
  logReport("=== INICIO DEL REPORTE DE AUTOMATIZACIÓN ===");

  const SEGUNDO = 1000;
  const DELAY = SEGUNDO * 5;
  try {

    await driver.get(url);
    await driver.sleep(SEGUNDO * 10);

    const inputUsuario = await driver.wait(until.elementLocated(By.xpath('//*[@id="flt-semantic-node-7"]/input') 
     ), SEGUNDO * 30
    );

    await driver.sleep(SEGUNDO * 3);

    await inputUsuario.sendKeys('qxuco2024');
    
    await driver.sleep(DELAY);
    
    const inputClave = await driver.findElement(By.xpath('//*[@id="flt-semantic-node-8"]/input')
    );

    await inputClave.sendKeys('qxuco2024*');

    await driver.sleep(DELAY);

    const botonLogin = await driver.findElement(By.xpath('//*[@id="flt-semantic-node-10"]')
    );

    botonLogin.click();

    await driver.sleep(DELAY);

    const botonproduct = await driver.findElement(By.xpath('//flt-semantics[span[contains(text(), "Productos")]]'));

    botonproduct.click(); 

    await driver.sleep(DELAY);

    const botonadd = await driver.findElement(By.xpath('//flt-semantics[@role = "button" and not (contains(text(), "Atrás"))]'));

    botonadd.click();

    await driver.sleep(DELAY);

    const InputNom = await driver.findElement(By.xpath('//input[@aria-label="Nombre del Producto"]'));

    await InputNom.sendKeys('Producto'); 

    await driver.sleep(DELAY);

    const InputDes = await driver.findElement(By.xpath('//input[@aria-label="Descripción (opcional)"]'));

    await InputDes.sendKeys('Producto coso'); 

    await driver.sleep(DELAY);

    const InputPre = await driver.findElement(By.xpath('//input[@aria-label="Precio de Venta"]'));

    await InputPre.clear();
  
    await InputPre.sendKeys('100'); 

    await driver.sleep(DELAY);

    const InputIva = await driver.findElement(By.xpath('//input[@aria-label="IVA (%)"]'));

    await InputIva.clear();
   
    await InputIva.sendKeys('10'); 

    await driver.sleep(DELAY);

    const AñaIn = await driver.findElement (By.xpath('//flt-semantics[text() = "Añadir inventario"]'));
    //flt-semantics[text()='Añadir inventario']

    await AñaIn.click();

    const InputProv = await driver.findElement(By.xpath('//input[@aria-label="Proveedor (opcional)"]'));
   
    await InputProv.sendKeys('pepe'); 

    await driver.sleep(DELAY);

    const InputPreCo = await driver.findElement(By.xpath('//input[@aria-label="Precio de compra (unitario)"]'));
   
    await InputPreCo.sendKeys('100'); 

    await driver.sleep(DELAY);

    const InputCan = await driver.findElement(By.xpath('//input[@aria-label="Cantidad"]'));
   
    await InputCan.sendKeys('10'); 

    await driver.sleep(DELAY);

    const BottonGuar = await driver.findElement(By.xpath('//flt-semantics[text()="Agregar"]'));

    await BottonGuar.click();

    await driver.sleep(DELAY);

    const BottonGuarPro = await driver.findElement (By.xpath('//flt-semantics[text() = "Guardar Producto"]'));

    await driver.wait(until.elementIsVisible(BottonGuarPro), SEGUNDO * 10);

    await BottonGuarPro.click(); 

    await driver.sleep(DELAY);

    



  } catch (error) {
    logReport(`Error en la automatización: ${error.message}`, "ERROR");
  } finally {
    // Cierra el navegador y finaliza el reporte
    await driver.quit();
    logReport("Cerrando el navegador.");
    logReport("=== FIN DEL REPORTE DE AUTOMATIZACIÓN ===");
  }
})();



// Función para agregar entradas al reporte de logs con formato bonito
function logReport(message, status = "INFO") {
  const timestamp = new Date().toLocaleString();
  const statusIcon = status === "ERROR" ? "❌" : status === "SUCCESS" ? "✅" : "ℹ️";
  const logMessage = `[${timestamp}] ${statusIcon} ${message}\n`;

  console.log(logMessage.trim()); // Mostrar en consola
  fs.appendFileSync(path.join(__dirname, 'test-report.log'), logMessage); // Escribir en archivo
}