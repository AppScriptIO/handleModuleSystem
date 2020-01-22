"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.ModuleContext = void 0;







const ModuleContextCachedList = {};


const ModuleContext = new Proxy(function () {}, {



  apply: (target, thisArg, argumentsList) => {
    return contextReference(...argumentsList);
  },

  construct: (target, argumentsList, newTarget) => {
    const Class = contextReference();
    return new Class(...argumentsList);
  } });exports.ModuleContext = ModuleContext;





function contextReference({
  cacheReferenceName = null } =
{}) {
  let context;
  if (cacheReferenceName && ModuleContextCachedList[cacheReferenceName]) {
    context = ModuleContextCachedList[cacheReferenceName];
  } else if (cacheReferenceName) {
    context = ModuleContextCachedList[cacheReferenceName] = createClassScope({ cacheReferenceName });
  } else {
    context = createClassScope();
  }
  return context;
}




function createClassScope({ cacheReferenceName } = {}) {var _class, _temp;
  const self = (_temp = _class = class ModuleContext {








    constructor({ target, cacheName = null }) {

      this.cacheName = cacheName;
      let proxified = this.proxify(target);
      return proxified;
    }


    proxify(target) {
      let cacheContext = this;
      let handler = {

        get: (target, property, receiver) => {
          if (property == 'moduleContext') {
            return cacheContext;
          } else {
            return target[property];
          }
        },

        apply: (target, thisArg, argumentsList) => {
          let instance;
          if (cacheContext.cacheName && self.targetCachedList[cacheContext.cacheName]) {
            instance = self.targetCachedList[cacheContext.cacheName];
          } else if (cacheContext.cacheName) {
            if (typeof argumentsList[0] == 'object') {
              self.targetCachedList[cacheContext.cacheName] = target.call(thisArg, Object.assign({ methodInstanceName: cacheContext.cacheName }, argumentsList[0]));
            } else {
              self.targetCachedList[cacheContext.cacheName] = target.call(thisArg, ...argumentsList);
            }
            instance = self.targetCachedList[cacheContext.cacheName];
            self.targetCounter.cached++;
          } else {
            instance = target.call(thisArg, ...argumentsList);

            if (process.env.SZN_DEBUG) {

              self.targetCounter.nonReferenced++;
              self.targetCachedList[Symbol.for(`${target.name} ${self.targetCounter.nonReferenced}`)] = instance;
            }
          }
          return instance;
        } };

      return new Proxy(target, handler);
    }}, _class.targetCachedList = {}, _class.targetCounter = { cached: 0, nonReferenced: process.env.SZN_DEBUG ? 0 : null }, _temp);



  Object.defineProperty(self, 'ModuleContextCachedList', {
    get: function () {
      return ModuleContextCachedList;
    } });


  if (cacheReferenceName) self.cacheReferenceName = cacheReferenceName;

  return self;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9Nb2R1bGVDb250ZXh0LmpzIl0sIm5hbWVzIjpbIk1vZHVsZUNvbnRleHRDYWNoZWRMaXN0IiwiTW9kdWxlQ29udGV4dCIsIlByb3h5IiwiYXBwbHkiLCJ0YXJnZXQiLCJ0aGlzQXJnIiwiYXJndW1lbnRzTGlzdCIsImNvbnRleHRSZWZlcmVuY2UiLCJjb25zdHJ1Y3QiLCJuZXdUYXJnZXQiLCJDbGFzcyIsImNhY2hlUmVmZXJlbmNlTmFtZSIsImNvbnRleHQiLCJjcmVhdGVDbGFzc1Njb3BlIiwic2VsZiIsImNvbnN0cnVjdG9yIiwiY2FjaGVOYW1lIiwicHJveGlmaWVkIiwicHJveGlmeSIsImNhY2hlQ29udGV4dCIsImhhbmRsZXIiLCJnZXQiLCJwcm9wZXJ0eSIsInJlY2VpdmVyIiwiaW5zdGFuY2UiLCJ0YXJnZXRDYWNoZWRMaXN0IiwiY2FsbCIsIk9iamVjdCIsImFzc2lnbiIsIm1ldGhvZEluc3RhbmNlTmFtZSIsInRhcmdldENvdW50ZXIiLCJjYWNoZWQiLCJwcm9jZXNzIiwiZW52IiwiU1pOX0RFQlVHIiwibm9uUmVmZXJlbmNlZCIsIlN5bWJvbCIsImZvciIsIm5hbWUiLCJkZWZpbmVQcm9wZXJ0eSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFRQSxNQUFNQSx1QkFBdUIsR0FBRyxFQUFoQzs7O0FBR08sTUFBTUMsYUFBYSxHQUFHLElBQUlDLEtBQUosQ0FBVSxZQUFXLENBQUUsQ0FBdkIsRUFBeUI7Ozs7QUFJcERDLEVBQUFBLEtBQUssRUFBRSxDQUFDQyxNQUFELEVBQVNDLE9BQVQsRUFBa0JDLGFBQWxCLEtBQW9DO0FBQ3pDLFdBQU9DLGdCQUFnQixDQUFDLEdBQUdELGFBQUosQ0FBdkI7QUFDRCxHQU5tRDs7QUFRcERFLEVBQUFBLFNBQVMsRUFBRSxDQUFDSixNQUFELEVBQVNFLGFBQVQsRUFBd0JHLFNBQXhCLEtBQXNDO0FBQy9DLFVBQU1DLEtBQUssR0FBR0gsZ0JBQWdCLEVBQTlCO0FBQ0EsV0FBTyxJQUFJRyxL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USxHQUFHcEIsTUFBTSxDQUFDc0IsSUFBUCxDQUFZckIsT0FBWixFQUFxQixHQUFHQyxhQUF4QixDQUFYOztBQUVBLGdCQUFJMEIsT0FBTyxDQUFDQyxHQUFSLENBQVlDLFNBQWhCLEVBQTJCOztBQUV6QnBCLGNBQUFBLElBQUksQ0FBQ2dCLGFBQUwsQ0FBbUJLLGFBQW5CO0FBQ0FyQixjQUFBQSxJQUFJLENBQUNXLGdCQUFMLENBQXNCVyxNQUFNLENBQUNDLEdBQVAsQ0FBWSxHQUFFakMsTUFBTSxDQUFDa0MsSUFBSyxJQUFHeEIsSUFBSSxDQUFDZ0IsYUFBTCxDQUFtQkssYUFBYyxFQUE5RCxDQUF0QixJQUF3SVgsUUFBeEk7QUFDRDtBQUNGO0FBQ0QsaUJBQU9BLFFBQVA7QUFDRCxTQWhDVyxFQUFkOztBQWtDQSxhQUFPLElBQUl0QixLQUFKLENBQVVFLE1BQVYsRUFBa0JnQixPQUFsQixDQUFQO0FBQ0QsS0F0RDhCLENBQXZCLFNBQ0RLLGdCQURDLEdBQ2tCLEVBRGxCLFNBRURLLGFBRkMsR0FFZSxFQUVyQkMsTUFBTSxFQUFFLENBRmEsRUFHckJJLGFBQWEsRUFBRUgsT0FBTyxDQUFDQyxHQUFSLENBQVlDLFNBQVosR0FBd0IsQ0FBeEIsR0FBNEIsSUFIdEIsRUFGZixRQUFWOzs7O0FBMERBUCxFQUFBQSxNQUFNLENBQUNZLGNBQVAsQ0FBc0J6QixJQUF0QixFQUE0Qix5QkFBNUIsRUFBdUQ7QUFDckRPLElBQUFBLEdBQUcsRUFBRSxZQUFXO0FBQ2QsYUFBT3JCLHVCQUFQO0FBQ0QsS0FIb0QsRUFBdkQ7OztBQU1BLE1BQUlXLGtCQUFKLEVBQXdCRyxJQUFJLENBQUNILGtCQUFMLEdBQTBCQSxrQkFBMUI7O0FBRXhCLFNBQU9HLElBQVA7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG5DcmVhdGVzIGEgSmF2YXNjcmlwdCBvYmplY3QgY29udGV4dCB0aGF0IGNhbiBiZSBjYWNoZWQuIFVzaW5nIEpTIHByb3h5LlxyXG4gKiBDYWNoZXMgbW9kdWxlcyBvbiBkZW1hbmQgdXNpbmcgYSB1bmlxdWUga2V5IG5hbWUuXHJcbiAqIFVzYWdlIG9wdGlvbnM6XHJcbiAqICDigKIgV2l0aCBrZXkgLSBPbmNlIGR1cmluZyBhcHAgaW5pdGlhbGl6YXRpb24sIHdoZXJlIHJlZmVyZW5jZXMgYXJlIHNhdmVkIChoYXJkIGxpbmspIHRvIGEgc3RyaW5nIGtleSAtIGUuZy4gXCJjb25kaXRpb25cIiwgXCJtaWRkbGV3YXJlXCIuXHJcbiAqICDigKIgQW5vbnltb3VzIC0gU2V2ZXJhbCB0aW1lcyBkdXJpbmcgYXBwIHJ1bnRpbWUsIHdoZXJlIGluc3RhbmNlcyBzaG91bGQgYmUgZ2FyYmFnZSBjb2xsZWN0ZWQgLSBlLmcuIHRlbXBsYXRlLlxyXG4gKi9cclxuXHJcbmNvbnN0IE1vZHVsZUNvbnRleHRDYWNoZWRMaXN0ID0ge30gLy8gYWxsIE1vZHVsZUNvbnRleHQgY2FjaGVkIGNsYXNzZXNcclxuXHJcbi8vIEludGVyZmFjZXM6IGV4cG9zZSBhcyAnbmV3JyBrZXl3b3JkIG9yIGZ1bmN0aW9uIGNhbGwuXHJcbmV4cG9ydCBjb25zdCBNb2R1bGVDb250ZXh0ID0gbmV3IFByb3h5KGZ1bmN0aW9uKCkge30sIHtcclxuICAvKipcclxuICAgKiAgQ3JlYXRlIGNhY2hlIG9mIG1vZHVsZSBjb250ZXh0IGJlZm9yZSBjcmVhdGluZyBhIGNhY2hlIGZvciB0YXJnZXQuXHJcbiAgICovXHJcbiAgYXBwbHk6ICh0YXJnZXQsIHRoaXNBcmcsIGFyZ3VtZW50c0xpc3QpID0+IHtcclxuICAgIHJldHVybiBjb250ZXh0UmVmZXJlbmNlKC4uLmFyZ3VtZW50c0xpc3QpXHJcbiAgfSxcclxuICAvLyBVc2UgQ29udGV4dE1vZHVsZSB3aXRob3V0IGNhY2hpbmcuXHJcbiAgY29uc3RydWN0OiAodGFyZ2V0LCBhcmd1bWVudHNMaXN0LCBuZXdUYXJnZXQpID0+IHtcclxuICAgIGNvbnN0IENsYXNzID0gY29udGV4dFJlZmVyZW5jZSgpXHJcbiAgICByZXR1cm4gbmV3IENsYXNzKC4uLmFyZ3VtZW50c0xpc3QpXHJcbiAgfSxcclxufSlcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgY29udGV4dCBmb3IgJ21vZHVsZUNvbnRleHQnIGNsYXNzXHJcbiAqL1xyXG5mdW5jdGlvbiBjb250ZXh0UmVmZXJlbmNlKHtcclxuICBjYWNoZVJlZmVyZW5jZU5hbWUgPSBudWxsLCAvLyBjYWNoZSByZWZlcmVuY2UgbmFtZS4gSW4gY2FzZSBzcGVjaWZpZWQgdGhlIE1vZHVsZUNvbnRleHQgY2xhc3Mgd291bGQgYmUgY2FjaGVkXHJcbn0gPSB7fSkge1xyXG4gIGxldCBjb250ZXh0XHJcbiAgaWYgKGNhY2hlUmVmZXJlbmNlTmFtZSAmJiBNb2R1bGVDb250ZXh0Q2FjaGVkTGlzdFtjYWNoZVJlZmVyZW5jZU5hbWVdKSB7XHJcbiAgICBjb250ZXh0ID0gTW9kdWxlQ29udGV4dENhY2hlZExpc3RbY2FjaGVSZWZlcmVuY2VOYW1lXVxyXG4gIH0gZWxzZSBpZiAoY2FjaGVSZWZlcmVuY2VOYW1lKSB7XHJcbiAgICBjb250ZXh0ID0gTW9kdWxlQ29udGV4dENhY2hlZExpc3RbY2FjaGVSZWZlcmVuY2VOYW1lXSA9IGNyZWF0ZUNsYXNzU2NvcGUoeyBjYWNoZVJlZmVyZW5jZU5hbWUgfSlcclxuICB9IGVsc2Uge1xyXG4gICAgY29udGV4dCA9IGNyZWF0ZUNsYXNzU2NvcGUoKVxyXG4gIH1cclxuICByZXR1cm4gY29udGV4dFxyXG59XHJcblxyXG4vKlxyXG4gKiBSZXR1cm5zIE1vZHVsZUNvbnRleHQgY2xhc3MgZWl0aGVyIGNhY2hlZCBvciBub3QuXHJcbiAqL1xyXG5mdW5jdGlvbiBjcmVhdGVDbGFzc1Njb3BlKHsgY2FjaGVSZWZlcmVuY2VOYW1lIH0gPSB7fSkge1xyXG4gIGNvbnN0IHNlbGYgPSBjbGFzcyBNb2R1bGVDb250ZXh0IHtcclxuICAgIHN0YXRpYyB0YXJnZXRDYWNoZWRMaXN0ID0ge30gLy8gbGlzdCBvZiBjYWNoZWQgdGFyZ2V0IG9iamVjdHNcclxuICAgIHN0YXRpYyB0YXJnZXRDb3VudGVyID0ge1xyXG4gICAgICAvLyBudW1iZXIgb2YgY3JlYXRlZCB0YXJnZXQgb2JqZWN0cy5cclxuICAgICAgY2FjaGVkOiAwLFxyXG4gICAgICBub25SZWZlcmVuY2VkOiBwcm9jZXNzLmVudi5TWk5fREVCVUcgPyAwIDogbnVsbCwgLy8gdGFyZ2V0cyBub3QgbWVhbnQgdG8gYmUgY2FjaGVkLCBvbmx5IGZvciBkZWJ1ZyBwdXBvc2VzLlxyXG4gICAgfVxyXG5cclxuICAgIC8vIEByZXR1cm5zIGEgcHJveGlmaWVkIHZlcnNpb24gb2YgdGFyZ2V0LlxyXG4gICAgY29uc3RydWN0b3IoeyB0YXJnZXQsIGNhY2hlTmFtZSA9IG51bGwgfSkge1xyXG4gICAgICAvKiB0aGlzID0gY2FjaGUgbW9kdWxlIGNvbnRleHQgKi9cclxuICAgICAgdGhpcy5jYWNoZU5hbWUgPSBjYWNoZU5hbWVcclxuICAgICAgbGV0IHByb3hpZmllZCA9IHRoaXMucHJveGlmeSh0YXJnZXQpXHJcbiAgICAgIHJldHVybiBwcm94aWZpZWRcclxuICAgIH1cclxuXHJcbiAgICAvLyBwcm94eSB3cmFwcyB0YXJnZXQgb2JqZWN0XHJcbiAgICBwcm94aWZ5KHRhcmdldCkge1xyXG4gICAgICBsZXQgY2FjaGVDb250ZXh0ID0gdGhpc1xyXG4gICAgICBsZXQgaGFuZGxlciA9IHtcclxuICAgICAgICAvLyBhZGQgJ21vZHVsZUNvbnRleHQnIGFzIGdldHRlciBwcm9wZXJ0eSBvZiB0aGUgdGFyZ2V0LlxyXG4gICAgICAgIGdldDogKHRhcmdldCwgcHJvcGVydHksIHJlY2VpdmVyKSA9PiB7XHJcbiAgICAgICAgICBpZiAocHJvcGVydHkgPT0gJ21vZHVsZUNvbnRleHQnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjYWNoZUNvbnRleHRcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0YXJnZXRbcHJvcGVydHldXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyBpbXBsZW1lbnRhdGlvbiBmb3IgZnVuY3Rpb25zIC0gY2FjaGUgZnVuY3Rpb25zIHdoZW4gY2FsbGVkIHdpdGggc2FtZSBjYWNoZU5hbWVcclxuICAgICAgICBhcHBseTogKHRhcmdldCwgdGhpc0FyZywgYXJndW1lbnRzTGlzdCkgPT4ge1xyXG4gICAgICAgICAgbGV0IGluc3RhbmNlXHJcbiAgICAgICAgICBpZiAoY2FjaGVDb250ZXh0LmNhY2hlTmFtZSAmJiBzZWxmLnRhcmdldENhY2hlZExpc3RbY2FjaGVDb250ZXh0LmNhY2hlTmFtZV0pIHtcclxuICAgICAgICAgICAgaW5zdGFuY2UgPSBzZWxmLnRhcmdldENhY2hlZExpc3RbY2FjaGVDb250ZXh0LmNhY2hlTmFtZV0gLy8gcmV0dXJuIHJlc3VsdCBvZiBjYWNoZWQgcHJldmlvdXMgY2FsbC5cclxuICAgICAgICAgIH0gZWxzZSBpZiAoY2FjaGVDb250ZXh0LmNhY2hlTmFtZSkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGFyZ3VtZW50c0xpc3RbMF0gPT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgICBzZWxmLnRhcmdldENhY2hlZExpc3RbY2FjaGVDb250ZXh0LmNhY2hlTmFtZV0gPSB0YXJnZXQuY2FsbCh0aGlzQXJnLCBPYmplY3QuYXNzaWduKHsgbWV0aG9kSW5zdGFuY2VOYW1lOiBjYWNoZUNvbnRleHQuY2FjaGVOYW1lIH0sIGFyZ3VtZW50c0xpc3RbMF0pKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHNlbGYudGFyZ2V0Q2FjaGVkTGlzdFtjYWNoZUNvbnRleHQuY2FjaGVOYW1lXSA9IHRhcmdldC5jYWxsKHRoaXNBcmcsIC4uLmFyZ3VtZW50c0xpc3QpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaW5zdGFuY2UgPSBzZWxmLnRhcmdldENhY2hlZExpc3RbY2FjaGVDb250ZXh0LmNhY2hlTmFtZV1cclxuICAgICAgICAgICAgc2VsZi50YXJnZXRDb3VudGVyLmNhY2hlZCsrXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpbnN0YW5jZSA9IHRhcmdldC5jYWxsKHRoaXNBcmcsIC4uLmFyZ3VtZW50c0xpc3QpXHJcbiAgICAgICAgICAgIC8vIENhY2hlIHRhcmdldHMgbm90IG5lZWRlZCB0byBiZSByZWZlcmVuY2VkIG9ubHkgaW4gZGVidWcgbW9kZS5cclxuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52LlNaTl9ERUJVRykge1xyXG4gICAgICAgICAgICAgIC8vIGZvciBkZWJ1ZyBwdXJwb3NlcywgY2FjaGUgdGFyZ2V0IG9iamVjdHMgd2l0aCBhdXRvbWF0aWNhbGx5IG5hbWVkIHJlZmVyZW5jZXMuXHJcbiAgICAgICAgICAgICAgc2VsZi50YXJnZXRDb3VudGVyLm5vblJlZmVyZW5jZWQrK1xyXG4gICAgICAgICAgICAgIHNlbGYudGFyZ2V0Q2FjaGVkTGlzdFtTeW1ib2wuZm9yKGAke3RhcmdldC5uYW1lfSAke3NlbGYudGFyZ2V0Q291bnRlci5ub25SZWZlcmVuY2VkfWAgLypjcmVhdGUgYSBuYW1lIHRoYXQgaXMgbW9yZSB1bmRlcnN0YW5kYWJsZSovKV0gPSBpbnN0YW5jZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gaW5zdGFuY2VcclxuICAgICAgICB9LFxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBuZXcgUHJveHkodGFyZ2V0LCBoYW5kbGVyKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gYWRkIGdldHRlciB0byByZWl0cml2ZSB0aGUgY2FjaGUgbGlzdCBvZiBzdGF0aWMgY2xhc3NlcyAnQ29udGV4dE1vZHVsZScgKGRlZmluaW5nIGdldHRlciBvbiBhbiBleGlzdGluZyBvYmplY3QpXHJcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHNlbGYsICdNb2R1bGVDb250ZXh0Q2FjaGVkTGlzdCcsIHtcclxuICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiBNb2R1bGVDb250ZXh0Q2FjaGVkTGlzdCAvLyByZXR1cm4gTW9kdWxlQ29udGV4dENhY2hlZExpc3QgdmFyaWFibGUgaW4gbW9kdWxlIHNjb3BlLlxyXG4gICAgfSxcclxuICB9KVxyXG4gIC8vIGFkZCByZWZlcmVuY2UgdXNlZCB0byBjYWNoZSB0aGUgY2xhc3MgaWYgYW55XHJcbiAgaWYgKGNhY2hlUmVmZXJlbmNlTmFtZSkgc2VsZi5jYWNoZVJlZmVyZW5jZU5hbWUgPSBjYWNoZVJlZmVyZW5jZU5hbWVcclxuXHJcbiAgcmV0dXJuIHNlbGZcclxufVxyXG4iXX0=