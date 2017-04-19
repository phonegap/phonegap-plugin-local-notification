/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 */
/* jshint jasmine: true */
/* global navigator, done, Notification */
exports.defineAutoTests = function() {

    describe('Notification', function() {
        it('Notification should be defined', function() {
            expect(Notification).toBeDefined();
            expect(typeof Notification).toBe('function');
            expect(Notification.requestPermission).toBeDefined();
            expect(typeof Notification.requestPermission).toBe('function');
        });

        it('Notification instance should include default properties', function() {
            var notification = new Notification('title');
            expect(notification.permission).toBeDefined();
            expect(notification.title).toBeDefined();
            expect(notification.title).toBe('title');
            expect(notification.dir).toBeDefined();
            expect(notification.dir).toBe('auto');
            expect(notification.lang).toBeDefined();
            expect(notification.body).toBeDefined();
            expect(notification.tag).toBeDefined();
            expect(notification.icon).toBeDefined();
            expect(notification.close).toBeDefined();
            expect(typeof notification.close).toBe('function');
        });

        it('Notification instance should get properties from options object', function() {
            var notification = new Notification('title', {
                dir: 'ltr',
                lang: 'en-US',
                body: 'body',
                tag: 'tag',
                icon: 'icon'
            });
            expect(notification.permission).toBeDefined();
            expect(notification.title).toBeDefined();
            expect(notification.title).toBe('title');
            expect(notification.dir).toBeDefined();
            expect(notification.dir).toBe('ltr');
            expect(notification.lang).toBeDefined();
            expect(notification.lang).toBe('en-US');
            expect(notification.body).toBeDefined();
            expect(notification.body).toBe('body');
            expect(notification.tag).toBeDefined();
            expect(notification.tag).toBe('tag');
            expect(notification.icon).toBeDefined();
            expect(notification.icon).toBe('icon');
            expect(notification.close).toBeDefined();
            expect(typeof notification.close).toBe('function');
        });

        it('Notification instance should throw exception without title property', function() {
            expect(function() { var n = new Notification(); }).toThrow();
        });
    });
};
