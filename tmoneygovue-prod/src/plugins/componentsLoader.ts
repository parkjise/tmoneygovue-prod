const uuModules = import.meta.glob('@/components/uu-components/*.vue', { eager: true });
const layoutModules = import.meta.glob('@/components/layout/*.vue', { eager: true });

export default function loadComponents(app: any) {
  for (const path in uuModules) {
    const componentName = path.split('/').pop().split('.')[0];
    app.component(`${componentName}`, uuModules[path].default);
  }
  for (const path in layoutModules) {
    const componentName = path.split('/').pop().split('.')[0];
    app.component(`${componentName}`, layoutModules[path].default);
  }
}
