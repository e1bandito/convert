# convert

Простой шаблон для сжатия и конвертации изображений в webp.

## Установка

```
npm i
```

## Использование

В папку img помещаются исходники графики в максимальном разрешении, форматы jpg или png.

Команды:

---

Процесс конвертации запускается командой

```
gulp convert --desktop 1920
```

в которой:

- **gulp convert** имя запускаемой таски
- **--desktop** суффикс, который будет добавлен к имени исходного файла
- **1920** желаемое разрешение графики по горизонтали на выходе

_Пример_:

Исходный файл называется **1.jpg**

После выполнения команды **gulp convert --mobile 1000** в папке output получим два файла **1-mobile.jpg** и **1-mobile.webp** шириной по горизонтали 1000px, соотношение ширины и высоты сохранятся.

---

Очищает папку output

```
gulp clean
```
