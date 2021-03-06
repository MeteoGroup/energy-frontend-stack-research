# Go server for Angular2 'main' component multiplication
## Purpose
Creates and serves wrapped Angular2 components to enable their multiplication on the same page.

## Introduction
The aim of this project was to provide a server which could be used to deliver Angular2 components wrapped by the other, on demand created, component. It is a part of a 'proof of concept' project which tests various solutions of creating multiple instances of the same 'main' component and use it at the same time. Go [here](https://github.com/amisiuda/angular2-multi-bootstrap-solution-1-app) for more information.

## How does it work
1. User sends a GET request to a server uder `/getwidgeturl` with information about the component it wants to receive and it's id. E.g. url: `/getwidgeturl/ComponentA/id/100`
2. Server checks if a wrapper with given id for this component already available.
3. If it is not available it will create a new wrapper component for given id and store for further usage.
4. If the component is already available or when the creation proces will come to an end server will respond with a URL to the new wrapper component. This URL is send as a plain text response.
5. User has to call now the server again with a received URL in order to get the wrapper container .js file.
6. Each new wrapper component will have a specific selector tag name. E.g wrapper for component 'TestComponent' with id 100 will be represented by the following DOM element:
   ```
   <test-component-100></test-component-100>
   ```
   User will have to add it to the DOM before the library will be fetched.

### Setup steps

1. Be sure that you have the proper rights to execute and change files in ll directories which will be involved in the installation process.
2. Checkout the project.
3. Open its 'setup.sh' and set GOROOT varaible to point to your go installation directory.
4. Run modified 'setup.sh' giving a directory where you want to install this project as a first argument (in other case it will be installed in the current directory).
5. After script has ended there should be a new exacutable file 'main' in your new project's 'bin' directory.
6. Go to `public/` directory and run `npm install`.
7. Set proper permissions to 'public/' diretory to be accessible via server.
8. Execute `bin/main' file. It will start a server which will listen for your requests on the port 9090.

### Test if it works
After running the server call "http://localhost:9090/getwidgeturl/ComponentA/id/100". Your should see following content `/asset/widgets/ComponentA100.js`.

Calling `http://localhost:9090/asset/widgets/ComponentA100.js` will return content of the wrapped Angular2 component for `ComponentA` component.

Setup script will create a simple main package which will use the server package.

To use this server as a library in your own project copy installed server packages (those generated by setup script) into your own project and install it. In your project use `server.Run()` to start the server. 
Example:

```
package main
import "github.com/amisiuda/golang__server-for-wrapping-angular2-components/server"

func main() {
    server.Run()
}
```

## Dependencies
To run tests you have to download the [testify](https://github.com/stretchr/testify) library and make it available under `github.com/stretchr/testify` path in `src` directory.

## Advantages / disadvantages / improvements

The main **disadvantage** is that the server produces wrapper files and keeps them in the file system. 

It could be **improved** by generating the widget code and sending it directly to the user on the first request (with proper headers). This approach would not require creating files and would remove the necessity to manage wrappers' files. The first attempt was a failure since SystemJS library did not support this solution. Maybe learning more about its configuration will allow the idea to be successfully implemented.
